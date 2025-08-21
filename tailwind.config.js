// tailwind.config.js

// Color palette constants for better maintainability
const colors = {
  // Brand colors
  brand: {
    green: {
      DEFAULT: '#58CC02', // Duolingo green
      light: '#7EE000',
      dark: '#4BA802',
      soft: '#E9F9E5',
    },
    blue: {
      DEFAULT: '#1CB0F6', // bright sky blue
      light: '#4CD6FD',
      dark: '#1895CC',
    },
    yellow: {
      DEFAULT: '#FFD43B', // cheerful yellow
      light: '#FFE873',
      dark: '#E6B800',
    },
  },
  // Semantic colors
  semantic: {
    danger: {
      DEFAULT: '#FF4B4B',
      light: '#FF7373',
      dark: '#CC3B3B',
    },
    neutral: {
      DEFAULT: '#636363',
      light: '#E5E5E5',
      dark: '#333333',
    },
  },
};

// Typography scale
const typography = {
  fontFamily: {
    sen: ['Sen', 'sans-serif'],
    baloo: ['"Baloo 2"', 'cursive'],
    fredoka: ['"Fredoka One"', 'cursive'],
    poppins: ['Poppins', 'sans-serif'],
  },
  fontSize: {
    // Semantic heading sizes
    'heading-xl': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700' }],
    'heading-lg': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],
    'heading-md': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '600' }],

    // Body text
    body: ['1rem', { lineHeight: '1.5rem' }],
    'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
    'body-xs': ['0.75rem', { lineHeight: '1rem' }],
  },
};

// Design tokens
const designTokens = {
  borderRadius: {
    sm: '0.375rem',
    DEFAULT: '0.5rem',
    md: '0.625rem',
    lg: '0.75rem',
    xl: '1.25rem',
    '2xl': '2rem',
    full: '9999px',
  },
  boxShadow: {
    soft: '0 4px 8px rgba(0, 0, 0, 0.08)',
    card: '0 6px 12px rgba(0, 0, 0, 0.12)',
    floating: '0 8px 24px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  },
  spacing: {
    18: '4.5rem',
    22: '5.5rem',
    26: '6.5rem',
  },
};

// Container configuration
const containerConfig = {
  center: true,
  padding: {
    DEFAULT: '1rem',
    sm: '1.5rem',
    lg: '2rem',
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
  },
};

// Main configuration
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],

  theme: {
    container: containerConfig,

    extend: {
      // Colors with semantic aliases
      colors: {
        // Primary brand colors
        primary: colors.brand.green,
        secondary: colors.brand.blue,
        accent: colors.brand.yellow,

        // Semantic colors
        success: colors.brand.green,
        warning: colors.brand.yellow,
        danger: colors.semantic.danger,
        neutral: colors.semantic.neutral,

        // Additional brand colors for flexibility
        'brand-green': colors.brand.green,
        'brand-blue': colors.brand.blue,
        'brand-yellow': colors.brand.yellow,
      },

      // Typography
      ...typography,

      // Design tokens
      ...designTokens,

      // Animation utilities for playful interactions
      animation: {
        'bounce-gentle': 'bounce 1s ease-in-out 2',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },

      // Custom utilities for the playful theme
      scale: {
        102: '1.02',
        103: '1.03',
      },
    },
  },

  plugins: [],
  darkMode: 'class',
};
