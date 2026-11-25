import { useState } from 'react';

export const useSwitchBridge = () => {
  const [isConnected, setIsConnected] = useState(false);

  const toggleBridge = () => {
    setIsConnected(prev => !prev);
  };

  return { isConnected, toggleBridge };
};
