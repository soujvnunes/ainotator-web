const elementAttributes = ['inert'] as const

export type ElementAttributes = (typeof elementAttributes)[number]
export default elementAttributes
