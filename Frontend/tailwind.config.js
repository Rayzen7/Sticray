/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        orange: "#FF7F00",
        background: "rgba(0,0,0,0.35)",
      },
      keyframes: {
        bounces: {
          '0%': { transform: 'translateY(0%)' },
          '20%': { transform: 'translateY(-5%)' },
          '40%': { transform: 'translateY(5%)' },
          '60%': { transform: 'translateY(-5%)' },
          '80%': { transform: 'translateY(5%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        bounces: 'bounces 9s infinite',
        fadeInUp: 'fadeInUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
}