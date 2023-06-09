import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-color": "#f0f8f6",
        "medium-color": "#d6f7f3",
      },
      fontFamily: {
        sans: ["GmarketSansMedium"],
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1025px",
    },
  },
  plugins: [daisyui],
  daisyui: {
    styled: true,
    themes: ["light"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
  },
};
