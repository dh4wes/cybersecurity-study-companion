import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

const site = process.env.SITE_URL || 'https://dh4wes.github.io';
const base = process.env.SITE_BASE || '/';
const offlineFallback = `${base.replace(/\/?$/, '/') }offline/`;

export default defineConfig({
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      experimental: {
        directoryAndTrailingSlashHandler: true
      },
      workbox: {
        navigateFallback: offlineFallback,
        globPatterns: ['**/*.{html,js,css,json,webmanifest,svg,png,ico,woff2,txt}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages',
              networkTimeoutSeconds: 3
            }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets'
            }
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Cybersecurity Study Companion',
        short_name: 'CyberStudy',
        description: 'Static 32-week cybersecurity study companion and local-first notes tool.',
        start_url: base,
        scope: base,
        display: 'standalone',
        theme_color: '#070707',
        background_color: '#070707',
        icons: [
          {
            src: `${base}pwa-192x192.svg`,
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: `${base}pwa-512x512.svg`,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  site,
  base,
  output: 'static'
});
