/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        round: 'var(--rounded)',
      },
      colors: {
        'primary-accent': 'var(--primary-accent)',
        'text-color': 'var(--text-color)',
        secondary: 'var(--secondary-text-color)',

        bg: 'var(--bg)',
        line: 'var(--line)',
        hover: 'var(--hover)',
      },
    },
  },
  plugins: [],
};
