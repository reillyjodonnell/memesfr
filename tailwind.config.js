/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    borderRadius: {
      DEFAULT: 'var(--rounded)',
    },
    extend: {
      colors: {
        'primary-accent': 'var(--primary-accent)',
        'text-color': 'var(--text-color)',
        bg: 'var(--bg)',
        line: 'var(--line)',
        hover: 'var(--hover)',
      },
    },
  },
  plugins: [],
};
