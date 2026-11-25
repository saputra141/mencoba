import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mencoba.app',
  appName: 'mencoba-app',
  webDir: 'out', // Pastikan ini 'out' sesuai dengan output Next.js
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
