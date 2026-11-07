/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36abf7',
          500: '#0c8ee9',
          600: '#0070c7',
          700: '#0159a1',
          800: '#064b84',
          900: '#0b3f6f',
          950: '#07284a'
        },
        navy: {
          800: '#0f2537',
          900: '#0a1926',
          950: '#061019'
        },
        accent: {
          DEFAULT: '#f59e0b',
          hover: '#d97706'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
};
