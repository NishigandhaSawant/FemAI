/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          50:  '#fff1f2',
          100: '#ffe0e2',
          200: '#ffc6ca',
          300: '#ff9da4',
          400: '#ff6470',
          500: '#f93a48',
          600: '#e61b2b',
          700: '#c21321',
          800: '#a1131f',
          900: '#861520',
          950: '#490509',
        },
        burgundy: {
          50:  '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d2d7',
          300: '#f4adb6',
          400: '#ec7e8c',
          500: '#e05065',
          600: '#cc3050',
          700: '#ab2141',
          800: '#8f1d3a',
          900: '#7b1c37',
          950: '#430a1a',
        },
        pearl: {
          50:  '#fafafa',
          100: '#f5f5f5',
          200: '#efefef',
          300: '#e8e8e8',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"SF Pro Display"', '"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'apple': '0 2px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        'apple-lg': '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        'apple-xl': '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
        'crimson': '0 4px 24px rgba(194,19,33,0.25)',
        'crimson-lg': '0 8px 40px rgba(194,19,33,0.35)',
      },
    },
  },
  plugins: [],
}
