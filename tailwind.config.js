/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ef4444',
        'primary-dark': '#dc2626',
        background: '#111111',
        'background-card': '#1a1a1a',
        text: '#ffffff',
        'text-secondary': '#a3a3a3',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        archivo: ['Archivo Black', 'sans-serif'],
        quantum: ['Quantum', 'sans-serif'],
      },
    },
  },
  plugins: [],
};