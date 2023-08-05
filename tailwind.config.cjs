const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  colors.violet[50],
          100: colors.violet[100],
          200: colors.violet[200],
          300: colors.violet[300],
          400: colors.violet[400],
          500: colors.violet[500],
          600: colors.violet[600],
          700: colors.violet[700],
          800: colors.violet[800],
          900: colors.violet[900],
        }
      }
    },
  },
}