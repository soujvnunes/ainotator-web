const annotatorTypes = ['polygon', 'brush'] as const

export type AnnotatorTypes = (typeof annotatorTypes)[number]

export default annotatorTypes
