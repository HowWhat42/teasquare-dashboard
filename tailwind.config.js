const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'Sans-Serif'],
        space: ['Space Grotesk', 'Sans-Serif'],
      },
      backgroundImage: {
        'main': "url('../public/img/background.png')"
      }
    },
  },
  plugins: [],
}
