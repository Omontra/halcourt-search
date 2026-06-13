import type { Config } from "tailwindcss";

/**
 * Concept B — "Cinematic Dark" theme.
 * Palette + type scale ported from concepts/concept-b-cinematic-dark/styles.css
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1418",
        charcoal: "#14202A",
        slate: "#18262F",
        "slate-2": "#1E2E38",
        gold: "#C8A86B",
        "gold-soft": "#D9C190",
        cream: "#F4F1EB",
        sea: "#A9BFC2",
        "sea-dim": "#8AA1A4",
      },
      fontFamily: {
        // Bound to next/font CSS variables in app/layout.tsx
        serif: ["var(--font-serif)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      borderColor: {
        line: "rgba(200,168,107,0.22)",
      },
      maxWidth: {
        site: "1240px",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(.22,.61,.36,1)",
      },
      keyframes: {
        kenburns: {
          from: { transform: "scale(1.04) translate(0, 0)" },
          to: { transform: "scale(1.14) translate(-1.5%, -1.5%)" },
        },
        scrollpulse: {
          "0%,100%": { opacity: "0.3", transform: "scaleY(0.7)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
      },
      animation: {
        kenburns: "kenburns 28s ease-in-out infinite alternate",
        scrollpulse: "scrollpulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
