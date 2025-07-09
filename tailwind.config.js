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
          50: '#fff5f2',
          100: '#ffe8e0',
          200: '#ffd4c7',
          300: '#ffb8a0',
          400: '#ff9472',
          500: '#ff7f50',
          600: '#e65a2e',
          700: '#cc4420',
          800: '#a6361a',
          900: '#8a2c15',
        },
        'wheeler-pink': {
          50: '#fef7f7',
          100: '#fef2f2',
          200: '#fde8e8',
          300: '#fcd6d7',
          400: '#ffc0cb',
          500: '#f9a8b4',
          600: '#f287a1',
          700: '#e8658a',
          800: '#d6436e',
          900: '#b91c5c',
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