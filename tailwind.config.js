/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'softhouze-red': '#E53935',
        'softhouze-blue': '#90A4AE',
        'softhouze-black': '#000000',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
