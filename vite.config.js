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
        description: "Your local fitness and workout guide",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait",
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
          {
            src: "/gym-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
