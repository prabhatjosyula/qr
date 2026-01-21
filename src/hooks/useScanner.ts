import { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { ScanResult, ScannerState } from '../types/scanner.types';
import { triggerHaptic, playBeep } from '../utils/haptics';

export const useScanner = () => {
  const [state, setState] = useState<ScannerState>({
    isScanning: false,
    hasPermission: false,
    error: null,
    result: null,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize scanner
  useEffect(() => {
    codeReaderRef.current = new BrowserMultiFormatReader();
    
    return () => {
      stopScanning();
    };
  }, []);

  const requestCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      streamRef.current = stream;
      setState(prev => ({ ...prev, hasPermission: true, error: null }));
      return true;
    } catch (err) {
      setState(prev => ({
        ...prev,
        hasPermission: false,
        error: 'Camera permission denied. Please allow camera access.',
      }));
      return false;
    }
  }, []);

  const handleScanSuccess = useCallback((result: Result) => {
    const scanResult: ScanResult = {
      text: result.getText(),
      format: result.getBarcodeFormat().toString() as any,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      result: scanResult,
      isScanning: false,
    }));

    triggerHaptic('success');
    playBeep();

    // Stop scanning after successful scan
    stopScanning();
  }, []);

  const startScanning = useCallback(async () => {
    if (!codeReaderRef.current || !videoRef.current) return;

    try {
      setState(prev => ({ ...prev, isScanning: true, error: null, result: null }));

      await codeReaderRef.current.decodeFromVideoDevice(
        undefined, // Use default camera
        videoRef.current,
        (result, error) => {
          if (result) {
            handleScanSuccess(result);
          }
          // Silently ignore errors during scanning (no code found is normal)
        }
      );
    } catch (err) {
      setState(prev => ({
        ...prev,
        isScanning: false,
        error: 'Failed to start scanner. Please try again.',
      }));
    }
  }, [handleScanSuccess]);

  const stopScanning = useCallback(() => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }

    setState(prev => ({ ...prev, isScanning: false }));
  }, []);

  const resetScanner = useCallback(() => {
    setState(prev => ({
      ...prev,
      result: null,
      error: null,
    }));
  }, []);

  return {
    ...state,
    videoRef,
    requestCameraPermission,
    startScanning,
    stopScanning,
    resetScanner,
  };
};