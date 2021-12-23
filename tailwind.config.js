const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        day: '#f8f8f8',
        night: '#1a202c',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
