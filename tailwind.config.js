/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ultra: { 900: '#0a0a0f', 800: '#12121a', 700: '#1c1c28' },
        accent: '#ff3d00',
      },
      fontFamily: { sans: ['system-ui', 'Arial', 'sans-serif'] },
    },
  },
  plugins: [],
};
