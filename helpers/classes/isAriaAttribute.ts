import ariaAttributes, { type AriaAttributes } from './ariaAttributes'

export default function isAriaAttribute(
  params: string,
): params is AriaAttributes {
  return ariaAttributes.includes(params as AriaAttributes)
}
