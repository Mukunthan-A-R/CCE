/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor:
      {
        'primary-bg': 'rgba(230, 228, 253, 1)',
      }
    },
  },
  plugins: [],
};
