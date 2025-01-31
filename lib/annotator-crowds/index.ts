const annotatorCrowds = ['yes', 'no'] as const

export type AnnotatorCrowds = (typeof annotatorCrowds)[number]

export default annotatorCrowds
