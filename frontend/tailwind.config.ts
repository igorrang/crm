import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        '15inch': { max: '1550px' },
        '13inch': { max: '1367px' }
      },
      colors: {
        bgPrimary: '#F4F4F4',
        bgSecondary: '#221F1F',
        bgLoginPage: '#49454F',
        yellowPrimary: '#FFC719',
        grayPrimary: '#B8B8B8',
        graySecondary: '#404040',
        brownPrimary: '#9F9A8D',
        orangePrimary: '#F2994A',
        orangeSecondary: '#FFE3A1',
        border: '#79747E'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('postcss-nested')]
} satisfies Config

export default config
