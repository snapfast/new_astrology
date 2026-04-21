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
        "primary": "#1A1C1D",
        "on-primary": "#FFFFFF",
        "accent": "#B69A47",
        "on-accent": "#FFFFFF",
        "surface": "#FFFFFF",
        "on-surface": "#1A1C1D",
        "surface-bright": "#F9F9FB",
        "surface-container-low": "#F0F1F3",
        "secondary": "#5E5E5E",
        "outline": "#E2E2E2",
        "background": "#F9F9FB"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["var(--font-lora)", "serif"],
        "body": ["var(--font-inter)", "sans-serif"],
        "label": ["var(--font-inter)", "sans-serif"]
      }
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/forms"),
  ],
} satisfies Config;
