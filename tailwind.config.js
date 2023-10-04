/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "russo-one": ['"Russo One"', "cursive"],
        oswald: ['"Oswald"', "cursive"],
        lato: ['"Lato"', "cursive"],
      },
    },
  },
  plugins: [require("daisyui")],
};
