/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b79d0',
        accent: '#1fb2a6',
        sidebar: '#004d73',
        bg: '#f5fbff',
        card: '#ffffff',
        muted: '#6b7280',
        text: '#09203a',
      },
      fontFamily: {
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}