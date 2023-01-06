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
      white: colors.white,
      gray: colors.gray,
      pink: colors.pink
    },
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    require('@tailwindcss/typography'),
  ],
};
