import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        gen: {
          50: "#f2f7ff",
          100: "#e5efff",
          500: "#315bea",
          600: "#264bd0",
          700: "#203fae"
        }
      },
      boxShadow: {
        soft: "0 12px 40px rgba(15, 23, 42, 0.08)",
        card: "0 8px 30px rgba(15, 23, 42, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
