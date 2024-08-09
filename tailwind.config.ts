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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary": "#239271",
        "primary-gray-dark": "#313B38",
        "primary-gray-light": "#383F3D",
        "primary-black": "#232E2B",
        "primary-white": "#CAD8D5",
        "primary-white-50": "rgba(202, 216, 213, 0.5)",
        "notion-gray": "#9B9A97",
        "notion-brown": "#64473A",
        "notion-orange": "#D9730D",
        "notion-yellow": "#DFAB01",
        "notion-green": "#0F7B6C",
        "notion-blue": "#0B6E99",
        "notion-purple": "#6940A5",
        "notion-pink": "#AD1A72",
        "notion-red": "#E03E3E",
      },
    },
    screens: {
      "semi-desktop": {"max": "1340px"}
    }
  },
  plugins: [],
  darkMode: "class",
};

export default config;
