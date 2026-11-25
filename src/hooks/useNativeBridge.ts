import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';

export const useNativeBridge = () => {
  const [info, setInfo] = useState<any>(null);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const platform = Capacitor.getPlatform();
    setIsNative(platform !== 'web');

    const initNative = async () => {
      if (platform !== 'web') {
        try {
          const deviceInfo = await Device.getInfo();
          setInfo(deviceInfo);
          await StatusBar.setStyle({ style: Style.Dark });
        } catch (e) {
          console.warn("Native features not available", e);
        }
      }
    };

    initNative();
  }, []);

  const triggerHaptic = async () => {
    if (isNative) {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } else {
      console.log("Haptic triggered (Web Mock)");
    }
  };

  return { info, isNative, triggerHaptic, platform: Capacitor.getPlatform() };
};
