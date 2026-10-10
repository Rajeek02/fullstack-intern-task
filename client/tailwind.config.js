/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        ink: { 950: '#05060f', 900: '#0a0c1a', 800: '#10132a', 700: '#181c3a' },
        brand: { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(124,58,237,0.55)',
        card: '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 30px 60px -30px rgba(0,0,0,0.8)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        gradient: { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        gradient: 'gradient 8s ease infinite',
      },
    },
  },
  plugins: [],
};
