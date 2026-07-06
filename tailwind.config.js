/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#EEF7FF',
          100: '#D5ECFF',
          200: '#B3DAFF',
          300: '#85C2FF',
          400: '#569EFF',
          500: '#2979FF',
          600: '#1565E0',
          700: '#1050C0',
          800: '#0C3D96',
          900: '#0A2E6E',
        },
        soft: {
          blue: '#EEF7FF',
          green: '#E8F5E9',
          yellow: '#FFF8E7',
          purple: '#EDE7F6',
          teal: '#E3F2FD',
          sage: '#F4F7EC',
        },
        glass: {
          white: 'rgba(255,255,255,0.7)',
          light: 'rgba(255,255,255,0.5)',
          dark: 'rgba(255,255,255,0.1)',
        },
      },
      backgroundImage: {
        'gradient-soft': 'linear-gradient(135deg, #EEF7FF 0%, #E3F2FD 50%, #EDE7F6 100%)',
        'gradient-green': 'linear-gradient(135deg, #E8F5E9 0%, #F4F7EC 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFF8E7 0%, #F4F7EC 100%)',
        'gradient-purple': 'linear-gradient(135deg, #EDE7F6 0%, #EEF7FF 100%)',
        'gradient-primary': 'linear-gradient(135deg, #2979FF 0%, #1565E0 100%)',
        'gradient-success': 'linear-gradient(135deg, #43A047 0%, #2E7D32 100%)',
        'gradient-warning': 'linear-gradient(135deg, #FB8C00 0%, #E65100 100%)',
        'gradient-danger': 'linear-gradient(135deg, #E53935 0%, #B71C1C 100%)',
        'gradient-info': 'linear-gradient(135deg, #039BE5 0%, #0277BD 100%)',
        'gradient-purple-solid': 'linear-gradient(135deg, #7B1FA2 0%, #4A148C 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00897B 0%, #004D40 100%)',
        'gradient-hero': 'linear-gradient(135deg, #EEF7FF 0%, #E3F2FD 40%, #EDE7F6 100%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(41, 121, 255, 0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'glass-lg': '0 16px 48px rgba(41, 121, 255, 0.12), 0 4px 16px rgba(0,0,0,0.06)',
        card: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 40px rgba(41, 121, 255, 0.15), 0 2px 8px rgba(0,0,0,0.06)',
        soft: '0 2px 16px rgba(0,0,0,0.06)',
        inner: 'inset 0 2px 8px rgba(0,0,0,0.06)',
        glow: '0 0 20px rgba(41, 121, 255, 0.3)',
        'glow-green': '0 0 20px rgba(67, 160, 71, 0.3)',
        'glow-purple': '0 0 20px rgba(123, 31, 162, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '12px',
        'glass-lg': '24px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-soft': 'bounceSoft 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
