import { registerSW } from 'virtual:pwa-register';

if (!globalThis.matchMedia?.('(display-mode: browser)').matches && 'Capacitor' in globalThis) {
  // Leave service worker registration disabled inside native shells.
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
