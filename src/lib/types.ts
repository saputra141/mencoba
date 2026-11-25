export interface AppStatus {
  engineActive: boolean;
  bridgeConnected: boolean;
  uptime: string;
  version: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

export interface EngineStats {
  cpuUsage: number;
  memoryUsage: number;
  latency: number;
}
