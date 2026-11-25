import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.saputra.mencoba',
  appName: 'Mencoba App',
  webDir: 'out', // Folder hasil 'next build'
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  // UI Tweaks untuk Android
  android: {
    backgroundColor: "#050506",
    allowMixedContent: true
  }
};

export default config;
