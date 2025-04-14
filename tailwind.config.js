/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main': '#164B35',
        'main-dark': '#0d3020',
        'second-main': '#164555',
        'second-main-dark': '#0d303a',
      },
    },
  },
  plugins: [],
} 