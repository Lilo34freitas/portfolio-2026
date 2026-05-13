import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#1A1A2E",
        "brand-violet": "#6C5CE7",
        "brand-cyan": "#00D2FF",
        "brand-white": "#F8F9FA",
        "brand-mint": "#A8EDCD",
        "brand-coral": "#FF6B6B",
        "brand-navy": "#2D3561",
        "brand-gray": "#636E72",
      },
      fontFamily: {
        jakArta: ["var(--font-jak-arta)", "sans-serif"],
        body: ["var(--font-quicksand)", "Quicksand", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "Outfit", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "Quicksand", "sans-serif"],
        bebas: ["var(--font-bebas)", "Bebas Neue", "sans-serif"],
      },
      keyframes: {
        "blob-morph": {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "rotate(0deg) scale(1)",
          },
          "33%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
            transform: "rotate(120deg) scale(1.1)",
          },
          "66%": {
            borderRadius: "50% 50% 30% 70% / 40% 70% 30% 60%",
            transform: "rotate(240deg) scale(0.95)",
          },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "float-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "blob-morph": "blob-morph 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float-up": "float-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
