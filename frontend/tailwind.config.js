/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#03060D',
        panel: '#07111F',
        blue: '#006BFF',
        crystal: '#00BFFF',
        cyan: '#4DEBFF',
        sapphire: '#083DCC',
        frost: '#F4F8FF',
      },
      fontFamily: { sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}

