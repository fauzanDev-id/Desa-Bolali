import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '390px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        desa: {
          darkGreen: '#073c24',
          primaryGreen: '#0b4625',
          greenHover: '#0f5930',
          accentGreen: '#15803d',
          lightGreen: '#eaf4ee',
          gold: '#eab308',
          goldHover: '#ca8a04',
          goldLight: '#fef9c3',
          pageBg: '#f2f6f3',
          surface: '#ffffff',
          textDark: '#0f172a',
          textMuted: '#64748b',
          border: '#e2e8f0',
        },
        'desa-darkGreen': '#073c24',
        'desa-primaryGreen': '#0b4625',
        'desa-greenHover': '#0f5930',
        'desa-accentGreen': '#15803d',
        'desa-lightGreen': '#eaf4ee',
        'desa-gold': '#eab308',
        'desa-goldHover': '#ca8a04',
        'desa-goldLight': '#fef9c3',
        'desa-pageBg': '#f2f6f3',
        'desa-surface': '#ffffff',
        'desa-textDark': '#0f172a',
        'desa-textMuted': '#64748b',
        'desa-border': '#e2e8f0',
      },
      maxWidth: {
        'desa-container': '1344px',
        'desa-canvas': '1376px',
      },
      borderRadius: {
        'desa-sm': '6px',
        'desa-card': '14px',
        'desa-pill': '9999px',
      },
      boxShadow: {
        'desa-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'desa-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        'desa-dropdown': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        script: ['var(--font-script)', 'Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}

export default config
