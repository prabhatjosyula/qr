import { useState } from 'react';
import { Scanner } from './components/Scanner';
import { ScanResult } from './components/ScanResult';
import { PermissionScreen } from './components/PermissionScreen';
import { useScanner } from './hooks/useScanner';
import { triggerHaptic } from './utils/haptics';
import './App.css';

function App() {
  const {
    isScanning,
    hasPermission,
    error,
    result,
    videoRef,
    requestCameraPermission,
    startScanning,
    stopScanning,
    resetScanner,
  } = useScanner();

  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const handleStartScanning = async () => {
    const permitted = await requestCameraPermission();
    if (permitted) {
      await startScanning();
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.text);
      setShowCopyMessage(true);
      triggerHaptic('light');
      setTimeout(() => setShowCopyMessage(false), 2000);
    }
  };

  const handleScanAgain = () => {
    resetScanner();
    handleStartScanning();
  };

  const handleClose = () => {
    stopScanning();
    resetScanner();
  };

  return (
    <div className="app">
      {!hasPermission && !result && (
        <PermissionScreen
          onRequestPermission={handleStartScanning}
          error={error}
        />
      )}

      {hasPermission && !result && (
        <Scanner
          videoRef={videoRef}
          isScanning={isScanning}
          onClose={handleClose}
        />
      )}

      {result && (
        <ScanResult
          result={result}
          onScanAgain={handleScanAgain}
          onCopy={handleCopy}
        />
      )}

      {showCopyMessage && (
        <div className="toast-message">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default App;