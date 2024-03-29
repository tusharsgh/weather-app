/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1070px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '740px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '629px'},
      // => @media (max-width: 639px) { ... }
    },
   extend: {},
  },
  plugins: [],
  
}