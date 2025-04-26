import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./client/index.html", 
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["Poppins", "Cairo", "ui-sans-serif", "system-ui", "sans-serif"],
      serif: ["Amiri", "ui-serif", "Georgia", "serif"],
    },
    colors: {
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
      },
      border: "#e5e7eb",
      input: "#e5e7eb",
      ring: "#1f2937",
      background: "#fcfaf7",
      foreground: "#333333",
      primary: {
        DEFAULT: "#4CAF50",
        foreground: "#ffffff",
      },
      secondary: {
        DEFAULT: "#f3f4f6",
        foreground: "#1f2937",
      },
      destructive: {
        DEFAULT: "#D32F2F",
        foreground: "#ffffff",
      },
      muted: {
        DEFAULT: "#f3f4f6",
        foreground: "#6b7280",
      },
      accent: {
        DEFAULT: "#D32F2F",
        foreground: "#ffffff",
      },
      popover: {
        DEFAULT: "#ffffff",
        foreground: "#1f2937",
      },
      card: {
        DEFAULT: "#ffffff",
        foreground: "#1f2937",
      },
      "primary-green": "#4CAF50",
      "primary-dark-green": "#388E3C",
      "primary-red": "#D32F2F",
      "primary-dark-red": "#B71C1C",
      "primary-yellow": "#FFC107",
      "primary-dark-yellow": "#FFB300",
    },
    extend: {
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
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
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.8s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
