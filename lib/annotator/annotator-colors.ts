const annotatorColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'sky',
  'indigo',
  'purple',
  'pink',
  'neutral',
] as const

export type AnnotatorColors = (typeof annotatorColors)[number]

export default annotatorColors
