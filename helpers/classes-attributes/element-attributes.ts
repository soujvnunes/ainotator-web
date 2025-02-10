const elementAttributes = ['inert', 'disabled', 'invalid'] as const

export type ElementAttributes = (typeof elementAttributes)[number]
export default elementAttributes
