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
      includeAssets: ["gym-icon.png", "gymx.png"], // Include static assets for cache
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Premium fitness tracking application.",
        theme_color: "#0a0a0a", // Matches the dark theme
        background_color: "#0a0a0a",
        display: "standalone",
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
          },
        ],
      },
      workbox: {
        // Increase limit to 10MB to accommodate large local JSON or media files
        maximumFileSizeToCacheInBytes: 10485760,
      },
    }),
  ],
});
