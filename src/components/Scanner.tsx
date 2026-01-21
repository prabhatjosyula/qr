import React, { useEffect } from 'react';

interface ScannerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isScanning: boolean;
  onClose: () => void;
}

export const Scanner: React.FC<ScannerProps> = ({
  videoRef,
  isScanning,
  onClose,
}) => {
  useEffect(() => {
    // Lock screen orientation to portrait on mobile
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('portrait').catch(() => {
        // Orientation lock may fail, that's okay
      });
    }

    return () => {
      // Unlock orientation when leaving
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
    };
  }, []);

  return (
    <div className="scanner-container">
      {/* Close button */}
      <button className="close-button" onClick={onClose} aria-label="Close scanner">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Video feed */}
      <video
        ref={videoRef}
        className="scanner-video"
        playsInline
        muted
      />

      {/* Scanning overlay with frame */}
      <div className="scan-overlay">
        <div className="scan-frame">
          <div className="corner top-left" />
          <div className="corner top-right" />
          <div className="corner bottom-left" />
          <div className="corner bottom-right" />
          
          {isScanning && (
            <div className="scan-line" />
          )}
        </div>
        
        <div className="scan-instructions">
          <p>Position QR code or barcode within frame</p>
        </div>
      </div>
    </div>
  );
};