import { useState, useEffect } from 'react';
import { BridgeState } from '@/lib/types';

export const useSwitchBridge = () => {
  const [bridge, setBridge] = useState<BridgeState>({
    isConnected: false,
    activeTransfer: false,
    transferRate: '0 MB/s',
    deviceName: 'Nintendo Switch (OLED)'
  });

  const toggleConnection = () => {
    setBridge(prev => ({
      ...prev,
      isConnected: !prev.isConnected,
      activeTransfer: false
    }));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (bridge.isConnected && Math.random() > 0.5) {
      setBridge(prev => ({ ...prev, activeTransfer: true }));
      interval = setInterval(() => {
        const rate = (Math.random() * 50 + 10).toFixed(1);
        setBridge(prev => ({ ...prev, transferRate: `${rate} MB/s` }));
      }, 2000);
    } else {
      setBridge(prev => ({ ...prev, activeTransfer: false, transferRate: '0 MB/s' }));
    }
    return () => clearInterval(interval);
  }, [bridge.isConnected]);

  return { bridge, toggleConnection };
};
