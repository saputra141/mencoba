import { useState, useEffect } from 'react';
import { BridgeStatus, LogEntry } from '../lib/types';

export const useSwitchBridge = () => {
  const [status, setStatus] = useState<BridgeStatus>({
    isConnected: false,
    activePort: 8080,
    uptime: '00:00:00',
    latency: 0
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string, level: LogEntry['level'] = 'info', source: string = 'BRIDGE') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      source
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(prev => ({ ...prev, isConnected: true }));
      addLog('SwitchBridge service initialized', 'success');
      addLog('Listening on UDP port 51413', 'info');
    }, 1500);

    const interval = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        latency: Math.floor(Math.random() * 15) + 5
      }));
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return { status, logs, addLog };
};
