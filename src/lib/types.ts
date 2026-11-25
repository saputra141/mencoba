export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source: string;
}

export interface SystemStats {
  cpuUsage: number;
  temperature: number;
  batteryLevel: number;
  memoryUsed: number;
  isDocked: boolean;
}

export interface BridgeStatus {
  isConnected: boolean;
  activePort: number;
  uptime: string;
  latency: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  app: string;
  time: string;
  type: 'game' | 'system' | 'friend';
}
