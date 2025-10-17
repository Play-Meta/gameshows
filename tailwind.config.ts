import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0095f6',
          hover: '#0064E0',
          light: 'rgba(0, 149, 246, 0.1)',
          border: 'rgba(0, 149, 246, 0.3)',
        }
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'slide-up': 'slideUp 0.3s ease',
        'countdown-in': 'countdownIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'countdown-out': 'countdownOut 0.2s cubic-bezier(0.32, 0, 0.67, 0) forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        countdownIn: {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        countdownOut: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(0.8)',
            opacity: '0'
          }
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': {
            opacity: '0.7',
            transform: 'scale(1.05)'
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;

