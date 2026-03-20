// capacitor.config.ts

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.egin.app',
  appName: 'Egin',
  webDir: 'www',
  bundling: {
    android: true,
  },
  plugins: {},
  server: {
    androidScheme: 'https',
  },
};

export default config;