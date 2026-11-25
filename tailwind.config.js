/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        switch: {
          red: "#ff4554",
          blue: "#00c3e3",
          gray: "#323232",
          dark: "#121212",
        }
      },
    },
  },
  plugins: [],
}
