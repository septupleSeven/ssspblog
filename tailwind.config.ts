import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;',
    },
    extend: {
      fontFamily: {
        "logo": "Nanum Myeongjo"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "select-chevron-light": "url('/hero-chevron-light.svg')",
        "select-chevron-dark": "url('/hero-chevron-dark.svg')",
        "github-mark-light": "url('/github-mark-light.svg')",
        "github-mark-dark": "url('/github-mark-dark.svg')"
      },
      colors: {
        primary: {
          DEFAULT: '#239271',
          'gray-dark': '#313B38',     
          'gray-light': '#f1f6f3',
          black: '#232E2B',
          'black-deep': '#121816',
          'black-50': 'rgba(35, 46, 43, 0.5)',
          white: '#CAD8D5',
          'white-50': 'rgba(202, 216, 213, 0.5)',
          'white-deep': '#a7beb9'
        }
      },
      boxShadow: {
        "reg": "0px 0px 10px rgba(0, 0, 0, .2)",
        "under": "0px 5px 10px rgba(0, 0, 0, .04)"
      }
    },
    screens: {
      "semi-desktop": {"max": "1064px"},
      "semi-tab": {"max": "860px"},
      "semi-mobile": {"max": "620px"}
    }
  },
  plugins: [],
  darkMode: "class",
};

export default config;
