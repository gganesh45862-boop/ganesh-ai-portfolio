/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#050816',
        },
        cyan: {
          450: '#3dd9eb',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(61, 217, 235, 0.18)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.12) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};
