import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(320%)' },
        },
        maskSlideRight: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(60%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        slideRight: 'slideRight 1s forwards',
        maskSlideRight: 'maskSlideRight 1s forwards',
        fadeIn: 'fadeIn 1s forwards',
      },
    },
  },
  plugins: [],
};

export default config;
