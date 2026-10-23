/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fem: {
          bg: '#FFF8F5',
          cream: '#FFF1E6',
          pink: '#E9A8B8',
          pinkHover: '#DE93A5',
          pinkLight: '#F8DDE4',
          pinkSoft: '#FCF1F4',
          text: '#493941',
          textMuted: '#7A6871',
          card: '#FFF9F7',
          sage: '#98A892',
          lavender: '#C8BBD9'
        }
      },
      boxShadow: {
        'neu-raised': '8px 8px 18px rgba(214, 185, 192, 0.35), -8px -8px 18px rgba(255, 255, 255, 0.95)',
        'neu-raised-sm': '4px 4px 10px rgba(214, 185, 192, 0.28), -4px -4px 10px rgba(255, 255, 255, 0.9)',
        'neu-raised-lg': '12px 12px 24px rgba(214, 185, 192, 0.4), -12px -12px 24px rgba(255, 255, 255, 1.0)',
        'neu-pressed': 'inset 4px 4px 8px rgba(214, 185, 192, 0.4), inset -4px -4px 8px rgba(255, 255, 255, 0.95)',
        'neu-button': '5px 5px 12px rgba(214, 185, 192, 0.35), -5px -5px 12px rgba(255, 255, 255, 0.9)',
        'neu-button-active': 'inset 3px 3px 6px rgba(180, 130, 142, 0.4), inset -3px -3px 6px rgba(255, 255, 255, 0.8)',
      },
      borderRadius: {
        'neu-xl': '1.5rem',
        'neu-2xl': '2rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
