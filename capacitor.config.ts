
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1b1aaf51e7ee45f9b8eb6cc58d1adb8b',
  appName: 'mobile-map-form-flow',
  webDir: 'dist',
  server: {
    url: 'https://1b1aaf51-e7ee-45f9-b8eb-6cc58d1adb8b.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Geolocation: {
      permissions: ['location']
    }
  }
};

export default config;
