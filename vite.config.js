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
        description: "A premium mobile-first fitness application",
        theme_color: "#121212",
        background_color: "#121212",
        display: "standalone",
        icons: [
          {
            src: "/gym-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/gym-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,gif}"],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15MB limit since gifs can be large
      },
    }),
  ],
});
