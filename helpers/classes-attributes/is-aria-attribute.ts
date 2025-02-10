import ariaAttributes, { type AriaAttributes } from './aria-attributes'

export default function isAriaAttribute(
  params: string,
): params is AriaAttributes {
  return ariaAttributes.includes(params as AriaAttributes)
}
