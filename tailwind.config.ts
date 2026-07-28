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
        "surface-container-lowest": "#ffffff",
        "tertiary-container": "#737373",
        "tertiary-fixed-dim": "#c2c2c2",
        "outline-variant": "#c4c4c4",
        "on-error-container": "#333333",
        "inverse-on-surface": "#f2f2f2",
        "tertiary-fixed": "#e2e2e2",
        "on-surface": "#111111",
        "error": "#444444",
        "surface-tint": "#333333",
        "on-error": "#ffffff",
        "surface-bright": "#fcfcfc",
        "on-tertiary": "#ffffff",
        "on-primary-fixed": "#111111",
        "background": "#ffffff",
        "surface-container": "#f5f5f5",
        "surface-dim": "#d6d6d6",
        "surface-container-highest": "#e0e0e0",
        "on-tertiary-fixed": "#111111",
        "on-surface-variant": "#444444",
        "inverse-surface": "#333333",
        "primary-container": "#eeeeee",
        "surface": "#ffffff",
        "primary-fixed-dim": "#cccccc",
        "primary-fixed": "#e0e0e0",
        "error-container": "#f5f5f5",
        "on-background": "#111111",
        "secondary": "#555555",
        "on-secondary-container": "#444444",
        "secondary-container": "#eeeeee",
        "on-secondary-fixed-variant": "#333333",
        "on-primary-fixed-variant": "#222222",
        "on-secondary": "#ffffff",
        "on-primary-container": "#111111",
        "secondary-fixed": "#e0e0e0",
        "on-tertiary-container": "#111111",
        "inverse-primary": "#cccccc",
        "on-secondary-fixed": "#111111",
        "outline": "#777777",
        "on-tertiary-fixed-variant": "#333333",
        "surface-variant": "#e0e0e0",
        "secondary-fixed-dim": "#bdbdbd",
        "tertiary": "#555555",
        "primary": "#222222",
        "on-primary": "#ffffff",
        "surface-container-low": "#f9f9f9",
        "surface-container-high": "#ebebeb"
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
