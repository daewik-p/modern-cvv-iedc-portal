
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#E9DBD8", // Warm Taupe for Background
        foreground: "#000000", // Black for contrast
        primary: {
          DEFAULT: "#664242", // Custom Navbar Color
          foreground: "#000000", 
        },
        secondary: {
          DEFAULT: "#D8FFE9", // Mint Green
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#E9DBD8", // Warm Taupe
          foreground: "#000000",
        },
        navbar: {
          DEFAULT: "#664242", // Custom Navbar Color
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF", // White for cards
          foreground: "#000000",
        },
        muted: {
          DEFAULT: "#FFE9DB", // Peach Beige
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "#FF1E1E", // Vibrant Red
          foreground: "#FFFFFF",
        },
      },                
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
