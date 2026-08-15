/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // The default font for the entire application
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      // The custom animation for the gradient background effect
      animation: {
        "gradient-flow": "gradient-flow 15s ease infinite",
      },
      keyframes: {
        "gradient-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};