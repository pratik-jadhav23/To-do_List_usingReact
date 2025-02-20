/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary":"#4392F1",
        "primary2":"#ECE8EF",
        "primary3":"#DC493A"
      }
    },
  },
  plugins: [],
}