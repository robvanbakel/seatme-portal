import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
      },
      gridTemplateColumns: {
        "auto-fill-80": "repeat(auto-fill, minmax(20rem, 1fr))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
