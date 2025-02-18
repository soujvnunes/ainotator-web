const annotatorColors = {
  red: '239 68 68',
  orange: '249 115 22',
  yellow: '132 204 22',
  green: '34 197 94',
  teal: '20 184 166',
  sky: '14 165 233',
  indigo: '99 102 241',
  purple: '168 85 247',
  pink: '236 72 153',
  neutral: '115 115 115',
} as const

export type AnnotatorColors = keyof typeof annotatorColors
export default annotatorColors
