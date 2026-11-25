import { useState, useCallback } from 'react';
import { BridgeConnection } from '@/lib/types';

export const useSwitchBridge = () => {
  const [connection, setConnection] = useState<BridgeConnection>({
    deviceId: 'NS-0921-X',
    deviceName: 'Nintendo Switch (OLED)',
    ipAddress: '192.168.1.15',
    status: 'disconnected',
    latency: 0
  });

  const [isScanning, setIsScanning] = useState(false);

  const toggleConnection = useCallback(() => {
    if (connection.status === 'connected') {
      setConnection(prev => ({ ...prev, status: 'disconnected', latency: 0 }));
    } else {
      setIsScanning(true);
      // Simulasi handshake bridge
      setTimeout(() => {
        setConnection(prev => ({ 
          ...prev, 
          status: 'connected', 
          latency: Math.floor(Math.random() * 40) + 10 
        }));
        setIsScanning(false);
      }, 2000);
    }
  }, [connection.status]);

  return {
    connection,
    isScanning,
    toggleConnection
  };
};
