/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adicione suas cores personalizadas aqui
        primary: '#45505E',
        secondary: '#8C9CAD',
        neutral: '#2E3742',
        green: '#008B57',
      },
    },
  },
  plugins: [],
}