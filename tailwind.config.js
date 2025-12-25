/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stacks: {
          50: '#f4f4f6',
          100: '#e3e3e8',
          500: '#5546FF',
          600: '#4536ee',
          900: '#131316',
        }
      }
    },
  },
  plugins: [],
}