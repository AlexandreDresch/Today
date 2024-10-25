/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,css}"],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        archivo: ["Archivo", "sans-serif"],
      },
      backgroundImage: {
        'main-pattern': "url('/background.svg')",
      }
    },
  },
  plugins: [],
};
