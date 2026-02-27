/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
        'cabinet': ['"Cabinet Grotesk"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'surface': {
          '50': '#fafafa',
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '800': '#121214',
          '900': '#09090b',
          '950': '#050506',
        },
        'accent': {
          DEFAULT: '#c8ff00',
          '50': '#f4ffe0',
          '100': '#eaffcc',
          '200': '#d5ff99',
          '300': '#c8ff00',
          '400': '#b8e600',
          '500': '#a3cc00',
        },
        'accent2': {
          DEFAULT: '#7B61FF',
          'light': '#9d85ff',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
        'marquee': 'marquee 25s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(200, 255, 0, 0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(200, 255, 0, 0.3)' },
        },
      },
    },
  },
  plugins: [],
};
