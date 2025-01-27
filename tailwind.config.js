import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './ui/**/*.{ts,tsx,mdx}',
    './containers/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-outfit-sans)',
          '-apple-system-font',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: {
        caption: [
          defaultTheme.fontSize.xs[0],
          {
            lineHeight: defaultTheme.lineHeight[4],
            fontWeight: defaultTheme.fontWeight.semibold,
          },
        ],
        label: [
          defaultTheme.fontSize.xs[0],
          {
            lineHeight: defaultTheme.lineHeight[4],
            fontWeight: defaultTheme.fontWeight.semibold,
          },
        ],
      },
    },
  },
  plugins: [],
}
