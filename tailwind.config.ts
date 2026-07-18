import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        "bg-soft": "#0b0b0d",
        surface: "#0f0f12",
        border: "#1e1e22",
        primary: {
          DEFAULT: "#FF6A00",
          light: "#FF8A3D",
          dark: "#CC5500",
        },
        secondary: "#FFFFFF",
        muted: "#9a9a9f",
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "Cairo", "Alexandria", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(255,106,0,0.08) 0%, rgba(5,5,5,0) 60%)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(255,106,0,0.35) 0%, rgba(255,106,0,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(255,106,0,0.45)",
        "glow-sm": "0 0 24px -6px rgba(255,106,0,0.5)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.06)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
