import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {},
    extend: {
      colors: {
        "light-color": "#f0f8f6",
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
