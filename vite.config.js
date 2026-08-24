import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 10485760, // 10MB
        globPatterns: ['**/*.{js,css,html,ico,png,svg,gif,json}'],
      },
      manifest: {
        name: 'GymX Fitness',
        short_name: 'GymX',
        description: 'Premium Fitness Tracker',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        icons: [
          {
            src: '/gym-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/gym-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});
