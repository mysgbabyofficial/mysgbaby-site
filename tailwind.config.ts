import type { Config } from 'tailwindcss';

// Palette is defined as CSS variables in app/globals.css (OKLCH) and referenced
// here so both light/dark and the "loss support" muted theme can re-map them.
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',      // lavender (logo badge)
        secondary: 'var(--color-secondary)',  // sage green
        accent: 'var(--color-accent)',        // warm peach
        gold: 'var(--color-gold)',            // crescent-moon gold
        trust: 'var(--color-trust)',          // soft blue (medical citations)
        brand: 'var(--color-brand-red)',      // Singapore red (wordmark)
        surface: 'var(--color-surface)',
        ink: 'var(--color-ink)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', 'cursive'],
      },
      borderRadius: { xl: '1rem', '2xl': '1.5rem' },
    },
  },
  plugins: [],
};

export default config;
