import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        panel: "#141210",
        gold: {
          DEFAULT: "#C79A4B",
          light: "#E4C480",
          dark: "#8A6A2F"
        },
        bone: "#F5F1E8"
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
