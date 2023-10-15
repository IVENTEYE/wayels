import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray': '#B7B9BD',
        'accent': '#7C58E0',
        'full': '#EB5769',
        'medium': '#F2AF4C',
        'normal': '#5DC983',
      },
      gridTemplateColumns: {
        'cards': 'repeat( auto-fill, minmax(446px, 1fr) )',
        'tiers': 'repeat( auto-fit, minmax(50px, 1fr) )',
        'packages': 'minmax(104px, 190px) minmax(80px, 130px) auto',
      },
      backgroundColor: {
        'full': '#EB5769',
        'medium': '#F2AF4C',
        'normal': '#5DC983',
      },
    },
    screens: {
      "tablet": '840px',
      "mobile-md": '480px',
      "mobile-sm": '320px',
    }
  },
  plugins: [],
}
export default config
