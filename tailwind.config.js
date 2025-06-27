/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'wheeler-purple': {
          50: '#f7f2ff',
          100: '#ede4ff',
          200: '#dccfff',
          300: '#c4adff',
          400: '#a784ff',
          500: '#8b5aff',
          600: '#7c3aed',
          700: '#6b21a8',
          800: '#592c65',
          900: '#35064f',
        },
        'wheeler-coral': {
          50: '#fef7f5',
          100: '#fdeee8',
          200: '#fad8c8',
          300: '#f6bea2',
          400: '#f09975',
          500: '#cb8f76',
          600: '#b87960',
          700: '#9e6851',
          800: '#825547',
          900: '#6b473e',
        },
        'wheeler-pink': {
          50: '#fdf7f5',
          100: '#fbeee8',
          200: '#f6d8c8',
          300: '#f0bea2',
          400: '#e89975',
          500: '#daa396',
          600: '#c78d7e',
          700: '#b0786c',
          800: '#95665b',
          900: '#7d554d',
        },
        'wheeler-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}