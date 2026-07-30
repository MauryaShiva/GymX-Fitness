import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'gym-icon.png'],
      manifest: {
        name: 'GymX Fitness',
        short_name: 'GymX',
        description: 'Premium mobile-first fitness application',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/gym-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/gym-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,webp,gif}'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
      },
    })
  ],
});