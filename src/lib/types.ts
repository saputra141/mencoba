export type EngineStatus = "idle" | "processing" | "completed" | "error";

export interface PortingProject {
  id: string;
  name: string;
  progress: number;
  status: EngineStatus;
  lastUpdated: string;
}

export interface BridgeConnection {
  deviceId: string;
  deviceName: string;
  ipAddress: string;
  status: "connected" | "disconnected" | "searching";
  latency: number;
}

export interface PortingState {
  projects: PortingProject[];
  activeProjectId: string | null;
  isEngineRunning: boolean;
}
