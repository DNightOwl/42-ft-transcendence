/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#7970B3",
        shape: "#414554",
        body: "#20222B",
        primaryText:"#fff",
        secondaryText: "#81879C",
        online: "#43FF83",
        offline:"#EC6565",
        
      },
      fontFamily: {
        sans: ['Poppins'],
      }
    },
  },
  plugins: [],
}
