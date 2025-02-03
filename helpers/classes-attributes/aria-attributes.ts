const ariaAttributes = [
  'busy',
  'checked',
  'disabled',
  'expanded',
  'hidden',
  'pressed',
  'readonly',
  'required',
  'selected',
] as const

export type AriaAttributes = (typeof ariaAttributes)[number]
export default ariaAttributes
