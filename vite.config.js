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
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Your personalized home workout and fitness application.",
        theme_color: "#121212",
        background_color: "#121212",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "Logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "Logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "Logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,json,gif}"],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB limit since gifs and json might be large
      },
    }),
  ],
});
