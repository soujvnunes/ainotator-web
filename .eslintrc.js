// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path')

module.exports = {
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  ignorePatterns: ['node_modules/**', 'next.config.js'],
  plugins: ['import-helpers'],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          '/^next/',
          'module',
          '/@/actions/',
          '/@/reducers/',
          '/@/lib/',
          '/@/helpers/',
          '/@/providers/',
          '/@/hooks/',
          '/@/ui/',
          '/@/containers/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: path.resolve(__dirname, './tsconfig.json'),
  },
}
