/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
