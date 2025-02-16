/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 8s linear infinite',
        'wave': 'wave 4s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        aurora: {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1) rotate(0deg)',
          },
          '50%': {
            opacity: 0.6,
            transform: 'scale(1.2) rotate(180deg)',
          },
        },
        wave: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#f3f4f6',
            a: {
              color: '#a78bfa',
              '&:hover': {
                color: '#c4b5fd',
              },
            },
            strong: {
              color: '#f3f4f6',
            },
            code: {
              color: '#e9d5ff',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
  ],
};