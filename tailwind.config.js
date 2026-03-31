/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        zap: '0 20px 60px -24px rgba(20, 22, 30, 0.45)',
      },
      colors: {
        ink: 'var(--color-ink)',
        paper: 'var(--color-paper)',
        accent: 'var(--color-accent)',
        line: 'var(--color-line)',
        panel: 'var(--color-panel)',
        muted: 'var(--color-muted)',
        success: 'var(--color-success)',
        danger: 'var(--color-danger)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
