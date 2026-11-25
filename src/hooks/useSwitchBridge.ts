import { useState, useEffect } from 'react';
import { BridgeStatus, LogEntry } from '@/lib/types';

export const useSwitchBridge = () => {
  const [status, setStatus] = useState<BridgeStatus>({
    isConnected: false,
    deviceName: null,
    batteryLevel: 0,
    ipAddress: null,
    latency: 0,
    activeGame: null,
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = (message: string, level: LogEntry['level'] = 'info', source: LogEntry['source'] = 'SYSTEM') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      source,
    };
    setLogs((prev) => [newLog, ...prev].slice(0, 50));
  };

  const connect = () => {
    addLog('Initiating handshake with Nintendo Switch...', 'info', 'BRIDGE');
    
    setTimeout(() => {
      setStatus({
        isConnected: true,
        deviceName: 'Switch-OLED-DB92',
        batteryLevel: 84,
        ipAddress: '192.168.1.42',
        latency: 12,
        activeGame: 'The Legend of Zelda: Tears of the Kingdom',
      });
      addLog('Connection established successfully', 'success', 'SWITCH');
      addLog('Sys-module "SwitchNotify" detected v2.4.0', 'info', 'SYSTEM');
    }, 1500);
  };

  const disconnect = () => {
    setStatus(prev => ({ ...prev, isConnected: false }));
    addLog('Bridge disconnected by user', 'warn', 'BRIDGE');
  };

  return { status, logs, connect, disconnect, addLog };
};
