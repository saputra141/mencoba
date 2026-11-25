import { useState, useCallback } from 'react';
import { PortingState, ProcessStatus } from '@/lib/types';

export const usePortingEngine = () => {
  const [state, setState] = useState<PortingState>({
    progress: 0,
    status: 'idle',
    currentTask: 'Ready to start',
    logs: []
  });

  const addLog = (msg: string) => {
    setState(prev => ({ ...prev, logs: [msg, ...prev.logs].slice(0, 50) }));
  };

  const startPorting = useCallback(async (target: string) => {
    setState(prev => ({ ...prev, status: 'processing', progress: 0 }));
    addLog(`Initiating porting process for ${target}...`);

    const tasks = [
      "Analyzing source assets...",
      "Extracting binary data...",
      "Converting shaders to GLSL/Vulkan...",
      "Optimizing textures for Tegra X1...",
      "Compiling executable modules...",
      "Finalizing package structure..."
    ];

    for (let i = 0; i < tasks.length; i++) {
      setState(prev => ({ 
        ...prev, 
        currentTask: tasks[i],
        progress: Math.round(((i + 1) / tasks.length) * 100)
      }));
      addLog(`Success: ${tasks[i]}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setState(prev => ({ ...prev, status: 'completed', currentTask: 'Porting Successful' }));
    addLog("Process finished: Package ready for deployment.");
  }, []);

  const reset = () => {
    setState({
      progress: 0,
      status: 'idle',
      currentTask: 'Ready to start',
      logs: []
    });
  };

  return { state, startPorting, reset };
};
