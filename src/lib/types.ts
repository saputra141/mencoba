export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source: 'SYSTEM' | 'SWITCH' | 'BRIDGE';
}

export interface BridgeStatus {
  isConnected: boolean;
  deviceName: string | null;
  batteryLevel: number;
  ipAddress: string | null;
  latency: number;
  activeGame: string | null;
}

export type PortingState = 'idle' | 'scanning' | 'connecting' | 'streaming' | 'error';
