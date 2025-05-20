/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui'), require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: ['autumn'],
  },
}
