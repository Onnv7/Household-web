/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-1': '#3BB77E',
        'primary-2': '#22c554 ',
        'gray-1': '#7E7E7E',
        'gray-2': '#f4f4f4',
        'hover-gray-1': '#ebe8e8'
      },
      fontSize: {
        normal: '1.2rem',
        small: '1rem',
      }
    },

  },
  plugins: [
    require('tailwind-children'),
  ],
}

