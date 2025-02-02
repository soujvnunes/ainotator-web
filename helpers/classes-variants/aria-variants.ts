const ariaVariants = [
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

export type AriaVariants = (typeof ariaVariants)[number]
export default ariaVariants
