/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f9fc',
          100: '#ccf3f9',
          200: '#99e7f3',
          300: '#66dbec',
          400: '#33cfe6',
          500: '#06ACC6',
          600: '#058a9e',
          700: '#046877',
          800: '#03464f',
          900: '#012428',
        },
        secondary: {
          50: '#ede9f4',
          100: '#dbd3e9',
          200: '#b7a7d3',
          300: '#937bbd',
          400: '#6f4fa7',
          500: '#533583',
          600: '#422a69',
          700: '#321f4f',
          800: '#211535',
          900: '#110a1a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        'handcaps': ['Handcaps', 'serif'],
        'sketch-chalk': ['Sketch Chalk', 'cursive'],
        'sunday-shine': ['Sunday Shine', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}