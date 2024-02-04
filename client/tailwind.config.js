/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
      "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
  },
  darkMode: "class",
  theme: {
    extend: {
      maxWidth: {
        xxs: "15rem",
      },
      screens: {
        xxs: "320px",
        xs: "425px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        xxxl: "2560px",
      },
      colors: {
        "custom-gray": "#F6F6F6",
        "custom-gray-2": "#F8F9FA",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
