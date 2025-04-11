import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        background: "hsl(var(--Background))",
        foreground: "hsl(var(--Foreground))",
        primary: {
          DEFAULT: "hsl(210, 80%, 50%)", // Tech Blue
          foreground: "hsl(210, 100%, 98%)", // Near White
          dark: "hsl(210, 90%, 60%)", // Lighter Blue for dark mode
        },
        secondary: {
          DEFAULT: "hsl(170, 60%, 45%)", // Vibrant Teal
          foreground: "hsl(170, 80%, 98%)",
          dark: "hsl(170, 70%, 55%)",
        },
        accent: {
          DEFAULT: "hsl(270, 70%, 60%)", // Neon Purple
          foreground: "hsl(270, 90%, 98%)",
          dark: "hsl(270, 80%, 70%)",
        },
        muted: {
          DEFAULT: "hsl(220, 15%, 70%)", // Light Gray
          foreground: "hsl(220, 10%, 30%)", // Dark Gray
          dark: "hsl(220, 20%, 40%)", // Muted for dark mode
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)", // White for light mode
          foreground: "hsl(220, 20%, 20%)",
          dark: "hsl(220, 30%, 15%)", // Dark Gray for dark mode
        },
        Background: {
          DEFAULT: "hsl(0, 0%, 98%)", // Off-White for light mode
          dark: "hsl(220, 25%, 10%)", // Deep Dark for dark mode
        },
        Foreground: {
          DEFAULT: "hsl(220, 20%, 20%)", // Dark Text for light mode
          dark: "hsl(220, 10%, 90%)", // Light Text for dark mode
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;