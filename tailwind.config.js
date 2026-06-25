/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        nw: {
          bg: "#F7F5F3",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          "card-alt": "#EEEAE6",
          accent: "#1B1918",
          // "orange" kept as alias so existing className refs auto-update to new accent
          orange: "#1B1918",
          // "white" now maps to primary dark text (inverted theme)
          white: "#1B1918",
          gray: "#6A6A6A",
          muted: "#6A6A6A",
          border: "#E6E6E6",
          green: "#9CA3AF",
          nav: "#1B1918",
          error: "#FF3B30",
        },
      },
      fontFamily: {
        // Brand fonts
        "fk":       ["FKGroteskNeue_Medium"],
        "suisse":   ["SuisseNeue_Medium"],
        // Aliases — all existing font-inter* classNames automatically use brand fonts
        "inter":      ["FKGroteskNeue_Medium"],
        "inter-semi": ["FKGroteskNeue_Medium"],
        "inter-bold": ["SuisseNeue_Medium"],
      },
    },
  },
  plugins: [],
};
