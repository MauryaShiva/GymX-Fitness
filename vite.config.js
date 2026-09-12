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
      includeAssets: ['gym-icon.png'],
      manifest: {
        name: 'GymX Fitness',
        short_name: 'GymX',
        description: 'Premium mobile-first fitness application',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'gym-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'gym-icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'gym-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10485760,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,gif}']
      }
    })
  ],
});
