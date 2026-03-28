const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Control dark pseudo-selector by ancestor's "dark" class
  darkMode: "class",
  // Scan these files for Tailwind classes
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // Necessary color utilities
      transparent: colors.transparent,
      current: colors.current,
      // Primary accent color — logo emerald green (buttons, CTAs, focus rings)
      primary: colors.emerald,
      // Grayscale
      gray: colors.zinc,
      // Explicit color scales used directly in components
      green: colors.green,
      yellow: colors.yellow,
      violet: colors.violet,
      // ── Gradient token palette ──────────────────────────────────────────
      // Mapped to CSS utility classes:
      //   .pink-blue  → neon.pink  → neon.blue   (brand: green → teal)
      //   .amber-red  → neon.amber → neon.red    (warm:  amber → orange)
      //   .green-sky  → neon.green → neon.sky    (cool:  violet → indigo)
      //   .green-teal → neon.purple→ neon.teal   (fresh: cyan → sky-blue)
      neon: {
        pink: "#32D873", // logo bright green    (.pink-blue from)
        blue: "#0D9488", // deep teal            (.pink-blue to)
        amber: "#F59E0B", // warm amber           (.amber-red from)
        red: "#EA580C", // vivid orange         (.amber-red to)
        green: "#8B5CF6", // violet               (.green-sky from)
        sky: "#6366F1", // indigo               (.green-sky to)
        purple: "#22D3EE", // bright cyan          (.green-teal from)
        teal: "#0EA5E9", // sky blue             (.green-teal to)
      },
    },
    extend: {
      fontFamily: {
        sans: ["Avenir Next", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
