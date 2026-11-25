import { useState, useCallback } from 'react';
import { BridgeStatus } from '../lib/types';

export const useSwitchBridge = () => {
  const [bridges, setBridges] = useState<BridgeStatus[]>([
    { id: '1', name: 'Primary Bridge', status: 'active', load: 45 },
    { id: '2', name: 'Secondary Path', status: 'idle', load: 0 },
  ]);

  const toggleBridge = useCallback((id: string) => {
    setBridges(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, status: b.status === 'active' ? 'idle' : 'active' };
      }
      return b;
    }));
  }, []);

  return { bridges, toggleBridge };
};
