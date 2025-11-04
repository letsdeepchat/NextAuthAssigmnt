/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0b1020',
        bgsoft: '#121a35',
        txt: '#e7eaf6',
        muted: '#a5b0d6',
        accent: '#4f77ff',
        danger: '#ff4f6a',
      }
    },
  },
  plugins: [],
};
