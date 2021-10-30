const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class', // TODO: change me
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      cursor: {
        'col-resize': 'col-resize'
      },
      colors: {
        primary: {
          DEFAULT: '#0A82FA',
          50: '#CBE4FE',
          100: '#AFD6FD',
          200: '#78BAFC',
          300: '#419EFB',
          400: '#0A82FA',
          500: '#0466C8',
          600: '#0459AF',
          700: '#034C96',
          800: '#03407D',
          900: '#023364'
        },
        trout: {
          DEFAULT: '#505468',
          50: '#F9FAFB',
          100: '#e8e9ed',
          200: '#c0c2ce',
          300: '#979caf',
          400: '#6f7590',
          500: '#505468',
          600: '#434656',
          700: '#353845',
          800: '#282a32',
          900: '#1b1c23'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwind-caret-color'),
    require('tailwindcss-textshadow')
  ]
};
