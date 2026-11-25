export interface BridgeStatus {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error';
  load: number;
}

export interface EngineConfig {
  threads: number;
  bufferSize: number;
  autoOptimize: boolean;
}
