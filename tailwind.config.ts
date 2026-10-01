import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF5900",
        "on-primary": "#FFFFFF",
        "accent": "#FF9900",
        "on-accent": "#000000",
        "surface": "#FFFFFF",
        "on-surface": "#000000",
        "surface-bright": "#F9F9FB",
        "surface-container-low": "#F0F1F3",
        "surface-container-lowest": "#F7F8F9",
        "surface-container-high": "#EBECEE",
        "secondary": "#FF5900",
        "outline": "#E2E2E2",
        "background": "#F9F9FB",
        "error": "#DC2626",
        "on-error": "#FFFFFF"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["var(--font-primary)", "var(--font-secondary)", "sans-serif"],
        "body": ["var(--font-primary)", "var(--font-secondary)", "sans-serif"],
        "label": ["var(--font-primary)", "var(--font-secondary)", "sans-serif"],
        "hindi": ["var(--font-akshar)", "serif"],
        "quicksand": ["var(--font-quicksand)", "sans-serif"],
        "halcom": ["var(--font-quicksand)", "sans-serif"]
      }
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/forms"),
  ],
} satisfies Config;
