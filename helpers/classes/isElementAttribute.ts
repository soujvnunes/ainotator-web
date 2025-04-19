import elementAttributes, { type ElementAttributes } from './elementAttributes'

export default function isElementAttribute(params: string): params is ElementAttributes {
  return elementAttributes.includes(params as ElementAttributes)
}
