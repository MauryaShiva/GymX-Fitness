import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['gym-icon.png', 'gymx.png'],
      manifest: {
        name: 'GymX Fitness',
        short_name: 'GymX',
        description: 'A modern and responsive fitness application',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        icons: [
          {
            src: 'gymx.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'gymx.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'gymx.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,gif}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/youtube-search-and-download\.p\.rapidapi\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'youtube-api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
});
