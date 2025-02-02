const rgb = {
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

export type AnnotatorColors = keyof typeof rgb

const classes: Record<
  'background' | 'color',
  Record<AnnotatorColors, string>
> = {
  background: {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    teal: 'bg-teal-500',
    sky: 'bg-sky-500',
    indigo: 'bg-indigo-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    neutral: 'bg-neutral-500',
  },
  color: {
    red: 'group-data-checked:text-red-500',
    orange: 'group-data-checked:text-orange-500',
    yellow: 'group-data-checked:text-yellow-500',
    green: 'group-data-checked:text-green-500',
    teal: 'group-data-checked:text-teal-500',
    sky: 'group-data-checked:text-sky-500',
    indigo: 'group-data-checked:text-indigo-500',
    purple: 'group-data-checked:text-purple-500',
    pink: 'group-data-checked:text-pink-500',
    neutral: 'group-data-checked:text-neutral-500',
  },
} as const
const annotatorColors = {
  rgb,
  classes,
}

export default annotatorColors
