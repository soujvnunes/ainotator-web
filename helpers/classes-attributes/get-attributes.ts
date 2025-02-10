import { type AriaAttributes } from './aria-attributes'
import { type ElementAttributes } from './element-attributes'
import isAriaAttribute from './is-aria-attribute'
import isAttributeVariant from './is-element-attribute'

const ariaAttribute = 'aria-' as const
const dataAttribute = 'data-classes-' as const

type AriaAttribute = typeof ariaAttribute
type DataAttribute = typeof dataAttribute
type Value = string | boolean

export type Attribute = {
  [K in AriaAttributes | ElementAttributes]?: Value
} & {
  [K in string & {}]?: Value
}

type Prop<P extends string> = P extends AriaAttributes
  ? `${AriaAttribute}${P}`
  : P extends ElementAttributes
    ? P
    : `${DataAttribute}${P}`

export type Attributes<A extends Attribute> = {
  [P in keyof A as Prop<P & string>]?: A[P]
}

export default function getAttributes<A extends Attribute>(
  attribute: A,
): Attributes<A> {
  const attributes: Partial<Record<string, Value>> = {}

  for (const [key, value] of Object.entries(attribute)) {
    let prop = `${dataAttribute}${key}`

    if (isAriaAttribute(key)) {
      prop = `${ariaAttribute}${key}`
    } else if (isAttributeVariant(key)) {
      prop = key
    }

    attributes[prop] = value || undefined
  }

  return attributes as Attributes<A>
}
