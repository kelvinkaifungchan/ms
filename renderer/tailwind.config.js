const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // use colors only specified
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      pink: colors.pink
    },
    extend: {
      colors: {
        'mono': {
          100: "#FFFFFF",
          200: "#E2E2E2",
          300: "#C5C5C5",
          400: "#A9A9A9",
          500: "#8D8D8D",
          600: "#717171",
          700: "#545454",
          800: "#383838",
          900: "#1C1C1C"
        }
      },
      boxShadow: {
        'inset': 'inset 0 0px 10px 0 rgb(0 0 0 / 0.5)' 
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('@tailwindcss/typography'),
  ],
};
