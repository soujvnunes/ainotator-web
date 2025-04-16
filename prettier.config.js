/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['classes', 'cva', 'twMerge'],
  jsxSingleQuote: false,
  bracketSameLine: true,
  singleAttributePerLine: true,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  enableDebugLogs: true,
  printWidth: 104,
}
