import React from 'react';

interface PermissionScreenProps {
  onRequestPermission: () => void;
  error: string | null;
}

export const PermissionScreen: React.FC<PermissionScreenProps> = ({
  onRequestPermission,
  error,
}) => {
  return (
    <div className="permission-screen">
      <div className="permission-content">
        <div className="camera-icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
        
        <h1>Camera Access Required</h1>
        <p>To scan QR codes and barcodes, we need access to your camera</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <button className="permission-button" onClick={onRequestPermission}>
          Enable Camera
        </button>
        
        <div className="permission-info">
          <p>Your privacy matters. We only access your camera when actively scanning.</p>
        </div>
      </div>
    </div>
  );
};