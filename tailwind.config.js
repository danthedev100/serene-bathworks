module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ceb560',
        secondary: '#faefed',
        accent: '#D4A373',
        neutraldark: '#6e5e3d',
        neutrallight: '#faefed',
      },
      borderRadius: { '2xl': '1rem' },
    },
  },
  plugins: [],
};
