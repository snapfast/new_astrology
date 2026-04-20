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
        "tertiary-container": "#737378",
        "tertiary-fixed-dim": "#c7c6cb",
        "outline-variant": "#c1c6d6",
        "on-error-container": "#93000a",
        "inverse-on-surface": "#f0f0f2",
        "tertiary-fixed": "#e3e2e7",
        "on-surface": "#1a1c1d",
        "error": "#ba1a1a",
        "surface-tint": "#005cbb",
        "on-error": "#ffffff",
        "surface-bright": "#f9f9fb",
        "on-tertiary": "#ffffff",
        "on-primary-fixed": "#001b3f",
        "background": "#f9f9fb",
        "surface-container": "#eeeef0",
        "surface-dim": "#d9dadc",
        "surface-container-highest": "#e2e2e4",
        "on-tertiary-fixed": "#1a1b1f",
        "on-surface-variant": "#414753",
        "inverse-surface": "#2f3132",
        "primary-container": "#0071e3",
        "surface": "#f9f9fb",
        "primary-fixed-dim": "#abc7ff",
        "primary-fixed": "#d7e2ff",
        "error-container": "#ffdad6",
        "on-background": "#1a1c1d",
        "secondary": "#5e5e5e",
        "on-secondary-container": "#646464",
        "secondary-container": "#e2e2e2",
        "on-secondary-fixed-variant": "#474747",
        "on-primary-fixed-variant": "#00458f",
        "on-secondary": "#ffffff",
        "on-primary-container": "#fcfbff",
        "secondary-fixed": "#e2e2e2",
        "on-tertiary-container": "#fcfaff",
        "inverse-primary": "#abc7ff",
        "on-secondary-fixed": "#1b1b1b",
        "outline": "#717785",
        "on-tertiary-fixed-variant": "#46464b",
        "surface-variant": "#e2e2e4",
        "secondary-fixed-dim": "#c6c6c6",
        "tertiary": "#5a5b5f",
        "primary": "#0059b5",
        "on-primary": "#ffffff",
        "surface-container-low": "#f3f3f5",
        "surface-container-high": "#e8e8ea"
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
