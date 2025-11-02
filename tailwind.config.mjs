/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#DCEAE3',
          100: '#BFD9CF',
          200: '#98C6BB',
          300: '#78B7A9',
          400: '#56A799',
          500: '#2E9B86',
          600: '#087F6C',  // Main Color
          700: '#065C4E',
          800: '#04312B',
          900: '#021B18',
        },
        secondary: {
          50: '#EAFDF0',
          100: '#D5FAE2',
          200: '#BDF3D1',
          300: '#AEEAC8',
          400: '#95DCBE',
          500: '#7FD0B8',  // Main Color
          600: '#5BB6A6',
          700: '#41978E',
          800: '#2E7A74',
          900: '#165A57',
        },
        orange: "#FF8042",
        purple: "#A28DFF",
        red: "#FF6B6B",
        priority: {
          high: "#ef4444",
          medium: "#f59e0b",
          low: "#10b981"
        },
        category: {
          productivity: {
            text: "#0088FE",
            bg: "#E6F3FF"
          },
          study: {
            text: "#00C49F",
            bg: "#E6FAF7"
          },
          wellness: {
            text: "#FFBB28",
            bg: "#FFF6E6"
          },
          technology: {
            text: "#A28DFF",
            bg: "#F3F0FF"
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ]
};