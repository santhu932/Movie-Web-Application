const daisyui = require('daisyui')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
