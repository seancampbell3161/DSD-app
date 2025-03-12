/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all your React components
  ],
  theme: {
    fontFamily: {
      header: '"Roboto Condensed", serif',
      body: '"Raleway",',
      flag: '"Raleway-SemiBold"',
      playfair: ['"Playfair Display"', "serif"],
    },
    extend: {
      colors: {
        red: "#d23715",
        accentYellow: "#ffd700",
        blue: "#0a2342",
        accentGreen: "#50c878",
        charcoal: "#333333",
        beige: "#edeade",
        lightGrey: "#f4f4f4",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
