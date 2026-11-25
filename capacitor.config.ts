import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.saputra.mencoba',
  appName: 'Mencoba App',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  // Menghapus bundledWebRuntime karena sudah deprecated
  android: {
    allowMixedContent: true
  }
};

export default config;
