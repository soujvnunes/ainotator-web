import ariaVariants, { type AriaVariants } from './aria-variants'

export default function isAriaVariant(params: string): params is AriaVariants {
  return ariaVariants.includes(params as AriaVariants)
}
