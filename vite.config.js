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
      includeAssets: ["gym-icon.png", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "GymX Fitness",
        short_name: "GymX",
        description: "Your ultimate fitness application",
        theme_color: "#000000",
        background_color: "#ffffff",
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
          }
        ]
      }
    }),
  ],
});
