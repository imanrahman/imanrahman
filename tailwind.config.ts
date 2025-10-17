import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0f172a',
          surface: '#111827',
          raised: '#1f2937'
        },
        primary: {
          DEFAULT: '#2563eb',
          foreground: '#eff6ff'
        },
        accent: {
          DEFAULT: '#22d3ee',
          muted: '#0891b2'
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Geist Sans"', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        '4.5': '1.125rem',
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem'
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.25rem' }],
        sm: ['0.875rem', { lineHeight: '1.4rem' }],
        base: ['1rem', { lineHeight: '1.6rem' }],
        lg: ['1.125rem', { lineHeight: '1.7rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }]
      },
      boxShadow: {
        elevated: '0 10px 30px rgba(15, 23, 42, 0.45)'
      }
    }
  },
  plugins: []
};

export default config;
