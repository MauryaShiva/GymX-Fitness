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
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Premium fitness application for your workouts",
        theme_color: "#1f2937",
        background_color: "#1f2937",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "gym-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "gym-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10485760, // 10MB
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,gif}"],
      },
    }),
  ],
});
