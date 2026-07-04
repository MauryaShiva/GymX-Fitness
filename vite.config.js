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
        description: "Premium Mobile-First Fitness Application",
        theme_color: "#1f2937",
        background_color: "#1f2937",
        display: "standalone",
        icons: [
          {
            src: "/gymx.png",
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
    })
  ],
});
