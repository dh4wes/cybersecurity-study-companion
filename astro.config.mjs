import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
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
