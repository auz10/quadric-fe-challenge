/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rich-black": "#0d1b2aff",
        "oxford-blue": "#1b263bff",
        "dazzled-blue": "#415a77ff",
        "shadow-blue": "#778da9ff",
        platinum: "#e0e1ddff",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
