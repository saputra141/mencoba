export type ProcessStatus = 'idle' | 'processing' | 'completed' | 'error';

export interface PortingState {
  progress: number;
  status: ProcessStatus;
  currentTask: string;
  logs: string[];
}

export interface BridgeState {
  isConnected: boolean;
  activeTransfer: boolean;
  transferRate: string;
  deviceName: string;
}

export interface DeviceInfo {
  id: string;
  name: string;
  type: 'switch' | 'pc' | 'mobile';
  status: 'online' | 'offline';
}
