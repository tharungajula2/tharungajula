import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Deep Void
        primary: "#06b6d4",    // Bio-Scan Cyan
        yukti: "#f97316",      // Blaze Orange
        taste: "#eab308",      // Rich Gold
        n1: "#10b981",         // Vitality Emerald
      },
      fontFamily: {
        heading: ["var(--font-outfit)"],
        body: ["var(--font-inter)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
