import React from 'react';
import { ScanResult as ScanResultType } from '../types/scanner.types';

interface ScanResultProps {
  result: ScanResultType;
  onScanAgain: () => void;
  onCopy: () => void;
}

export const ScanResult: React.FC<ScanResultProps> = ({
  result,
  onScanAgain,
  onCopy,
}) => {
  const formatType = result.format.replace(/_/g, ' ');
  
  const isUrl = result.text.startsWith('http://') || result.text.startsWith('https://');

  return (
    <div className="scan-result-overlay">
      <div className="scan-result-card">
        <div className="success-icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        
        <h2>Scanned Successfully</h2>
        
        <div className="format-badge">{formatType}</div>
        
        <div className="result-content">
          <p>{result.text}</p>
        </div>
        
        <div className="action-buttons">
          {isUrl && (
            <a href={result.text} target="_blank" rel="noopener noreferrer" className="action-button primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open Link
            </a>
          )}
          
          <button className="action-button secondary" onClick={onCopy}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </button>
          
          <button className="action-button secondary" onClick={onScanAgain}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Scan Again
          </button>
        </div>
      </div>
    </div>
  );
};