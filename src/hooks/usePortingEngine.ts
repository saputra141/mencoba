import { useState, useEffect } from 'react';
import { SystemStats } from '../lib/types';

export const usePortingEngine = () => {
  const [stats, setStats] = useState<SystemStats>({
    cpuUsage: 0,
    temperature: 0,
    batteryLevel: 0,
    memoryUsed: 0,
    isDocked: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpuUsage: Math.floor(Math.random() * 40) + 20,
        temperature: Math.floor(Math.random() * 15) + 35,
        batteryLevel: 85,
        memoryUsed: 1.4,
        isDocked: true
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { stats };
};
