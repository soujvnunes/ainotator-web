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
          '/^react-redux/',
          '/^@reduxjs/',
          'module',
          '/@/consts/',
          '/@/api/',
          '/@/slices/',
          '/@/lib/',
          '/@/selectors/',
          '/@/helpers/',
          '/@/providers/',
          '/@/hooks/',
          '/@/styles/',
          '/@/components/',
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
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: path.resolve(__dirname, './tsconfig.json'),
  },
}
