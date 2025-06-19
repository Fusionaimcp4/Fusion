/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          mono: ['var(--font-mono)'],
          sans: ['Inter', 'system-ui', 'sans-serif'],
          heading: ['Inter', 'system-ui', 'sans-serif'],
        },
        spacing: {
          'safe': 'env(safe-area-inset-bottom, 0px)',
        },
        padding: {
          'safe': 'env(safe-area-inset-bottom, 0px)',
        },
      },
    },
    plugins: [],
  }
  
  