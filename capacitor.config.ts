import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.saputra.mencoba',
  appName: 'Mencoba App',
  webDir: 'out', // Harus match dengan output folder Next.js
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
