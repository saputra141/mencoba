export type ProjectEngine = 'Unity' | 'Unreal' | 'Godot' | 'CustomC++' | 'Cocos';
export type BuildStatus = 'idle' | 'analyzing' | 'porting' | 'compiling' | 'success' | 'failed';

export interface ProjectMetadata {
  id: string;
  name: string;
  engine: ProjectEngine;
  sourcePath: string;
  lastModified: Date;
  size: string;
  platformSource: 'Nintendo Switch' | 'Multi-platform';
}

export interface AnalysisReport {
  compatibilityScore: number; // 0-100
  components: {
    name: string;
    status: 'compatible' | 'modification_required' | 'replacement_required' | 'unsupported';
    description: string;
    category: 'Graphics' | 'Input' | 'Audio' | 'Storage' | 'Core';
  }[];
}

export interface BuildLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  module: 'NDK' | 'Gradle' | 'AI_Agent' | 'Assets';
}
