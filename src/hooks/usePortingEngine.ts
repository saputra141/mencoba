import { useState } from 'react';
import { PortingState } from '@/lib/types';

export const usePortingEngine = () => {
  const [state, setState] = useState<PortingState>('idle');
  const [progress, setProgress] = useState(0);

  const startStreaming = () => {
    setState('scanning');
    setProgress(0);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setState('streaming');
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 400);
  };

  const stopStreaming = () => {
    setState('idle');
    setProgress(0);
  };

  return { state, progress, startStreaming, stopStreaming };
};
