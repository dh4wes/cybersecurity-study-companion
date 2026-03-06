import { registerSW } from 'virtual:pwa-register';

const isCapacitorRuntime =
  typeof globalThis !== 'undefined' &&
  typeof globalThis.Capacitor === 'object' &&
  globalThis.Capacitor !== null;

if (isCapacitorRuntime) {
  console.info('Capacitor runtime detected; skipping service worker registration.');
} else {
  registerSW({
    immediate: true,
    onOfflineReady() {
      console.info('CyberStudy is ready for offline use.');
    },
    onNeedRefresh() {
      console.info('CyberStudy update available. Reload to use the latest version.');
    }
  });
}
