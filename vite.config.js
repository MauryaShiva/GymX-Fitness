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
      includeAssets: ["gym-icon.png", "gymx.png", "gif/**/*.gif"], // Cache large media assets
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Your ultimate fitness companion.",
        theme_color: "#000000", // Dark theme first
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/gym-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/gym-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15MB to support local GIFs
        globPatterns: ["**/*.{js,css,html,ico,png,svg,gif,json}"],
        navigateFallbackDenylist: [/^\/api/], // Keep API routes dynamic
      },
    }),
  ],
});
