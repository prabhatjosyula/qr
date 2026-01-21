export type ScanFormat = 'QR_CODE' | 'EAN_13' | 'EAN_8' | 'UPC_A' | 'CODE_128' | 'CODE_39' | 'ITF' | 'DATA_MATRIX';

export interface ScanResult {
  text: string;
  format: ScanFormat;
  timestamp: number;
}

export interface ScannerState {
  isScanning: boolean;
  hasPermission: boolean;
  error: string | null;
  result: ScanResult | null;
}