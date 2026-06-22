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
          accent: "#D6FF3F",
          // "orange" kept as alias so existing className refs auto-update to new accent
          orange: "#D6FF3F",
          // "white" now maps to primary dark text (inverted theme)
          white: "#1B1918",
          gray: "#6A6A6A",
          muted: "#6A6A6A",
          border: "#E6E6E6",
          green: "#4CD964",
          nav: "#1B1918",
          error: "#FF3B30",
        },
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-semi": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};
