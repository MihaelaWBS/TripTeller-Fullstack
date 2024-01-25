/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: { "8xl": "86rem", "9xl": "90rem", "10xl":"96rem" }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}