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
      workbox: {
        maximumFileSizeToCacheInBytes: 10485760, // 10MB to avoid cache issues with GIFs
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,gif}"],
      },
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Your personalized fitness companion",
        theme_color: "#000000",
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
          }
        ]
      }
    }),
  ],
});
