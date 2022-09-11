/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E0E0E0",
        secondary: "#828282",
        blue: "#2F80ED",
        red: "#EB5757",
        gray: {
          200: "#3C393F",
          500: "#252329",
          600: "#222222",
          700: "#120F13",
          900: "#0B090C",
        },
        white: {
          0: "#FFFFFF",
          200: "#F2F2F2",
          300: "#BDBDBD",
        },
      },
    },
  },
  plugins: [require("tailwindcss-no-scrollbar")],
};
