import { useState, useEffect } from 'react';

export const usePortingEngine = () => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 50);
    } else if (progress >= 100) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, progress]);

  const startPorting = () => {
    setProgress(0);
    setIsRunning(true);
  };

  return { progress, isRunning, startPorting };
};
