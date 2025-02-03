import { type AriaAttributes } from './aria-attributes'
import { type ElementAttributes } from './element-attributes'
import isAriaAttribute from './is-aria-attribute'
import isAttributeVariant from './is-element-attribute'

type Value = string | boolean

export type Attribute = Partial<
  Record<AriaAttributes | ElementAttributes, Value> & Record<string & {}, Value>
>

type Prop<P extends string> = P extends AriaAttributes
  ? `aria-${P}`
  : P extends ElementAttributes
    ? P
    : `data-${P}`

export type Attributes<A extends Attribute> = {
  [P in keyof A as Prop<P & string>]?: A[P]
}

export default function getAttributes<A extends Attribute>(
  attribute: A,
): Attributes<A> {
  const attributes: Partial<Record<string, Value>> = {}

  for (const [key, value] of Object.entries(attribute)) {
    let prop = `data-${key}`

    if (isAriaAttribute(key)) {
      prop = `aria-${key}`
    } else if (isAttributeVariant(key)) {
      prop = key
    }

    attributes[prop] = value || undefined
  }

  return attributes as Attributes<A>
}
