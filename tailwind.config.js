const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#04070a",
        background: "#f3f7fc",
        primary: "#3986d7",
        secondary: "#83b8ef",
        accent: "#4a9cf3",
      },
    },
  },
  plugins: [],
});
