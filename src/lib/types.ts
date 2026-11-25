export type BuildStatus = 'idle' | 'analyzing' | 'compiling' | 'signing' | 'uploading' | 'completed' | 'failed';

export interface ReleaseAsset {
  id: string;
  name: string;
  size: string;
  type: 'apk' | 'nro' | 'zip' | 'bin';
  status: 'pending' | 'ready';
}

export interface PortingState {
  progress: number;
  status: BuildStatus;
  logs: string[];
  currentTask: string;
}

export interface BuildResult {
  version: string;
  changelog: string;
  assets: ReleaseAsset[];
}
