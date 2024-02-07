import tailwindForms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'kumbh-sans': ['var(--font-kumbh-sans)']
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '600px',
          md: '728px',
          lg: '950px',
          xl: '950px',
          '2xl': '950px'
        }
      },
      boxShadow: {
        left: '-8px 10px 15px -3px rgb(0 0 0 / 0.1), -4px 4px 6px -4px rgb(0 0 0 / 0.1)'
      }
    }
  },
  plugins: [tailwindForms]
};
export default config;
