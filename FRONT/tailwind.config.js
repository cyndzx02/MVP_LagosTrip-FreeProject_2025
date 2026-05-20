/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0a2850',
          50:  '#e6ebf2',
          100: '#c1cddc',
          200: '#94a8c0',
          300: '#6783a3',
          400: '#3a5e87',
          500: '#0a2850',
          600: '#082244',
          700: '#061a34',
          800: '#041224',
          900: '#020a14',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      maxWidth: {
        'screen-content': '1200px',
      },
    },
  },
  plugins: [],
}
