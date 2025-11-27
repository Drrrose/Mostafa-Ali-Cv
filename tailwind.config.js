/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003366', // Dark Blue estimate
        secondary: '#4b5563', // Gray-600
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'], // Standard for CVs
      }
    },
  },
  plugins: [],
}
