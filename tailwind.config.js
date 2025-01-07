/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      backgroundColor: {
        "primary-transparent": "rgba(92, 103, 247, 0.1)",
      },
      colors: {
        "primary-transparent": "rgb(92, 103, 247)",
      },
    },
  },
  plugins: [],
};
