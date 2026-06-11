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
      registerType: "autoUpdate",
      includeAssets: ["gym-icon.png", "gymx.png"],
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Premium fitness application with comprehensive exercise library",
        theme_color: "#ffffff",
        background_color: "#fffafb",
        display: "standalone",
        icons: [
          {
            src: "/gym-icon.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/gym-icon.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/gym-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,gif,json}"],
        maximumFileSizeToCacheInBytes: 10000000 // 10MB to accommodate gif/json
      }
    }),
  ],
});
