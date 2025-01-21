const annotatorToolbarModes = ['brush', 'polygon'] as const

export type Modes = (typeof annotatorToolbarModes)[number] | null

export default annotatorToolbarModes
