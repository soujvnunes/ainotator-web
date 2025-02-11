const ariaAttributes = [
  'busy',
  'checked',
  'expanded',
  'hidden',
  'pressed',
  'readonly',
  'required',
  'selected',
] as const

export type AriaAttributes = (typeof ariaAttributes)[number]
export default ariaAttributes
