import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './ui/**/*.{ts,tsx,mdx}',
    './containers/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        'var(--font-outfit-sans)',
        '-apple-system-font',
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  plugins: [],
}
