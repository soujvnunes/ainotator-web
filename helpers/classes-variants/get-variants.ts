import { type AriaVariants } from './aria-variants'
import { type AttributeVariants } from './attribute-variants'
import isAriaVariant from './is-aria-variant'
import isAttributeVariant from './is-attribute-variant'

type Value = string | boolean

export type Variant = Partial<
  Record<AriaVariants | AttributeVariants, Value> & Record<string & {}, Value>
>

export type Attribute<K extends string> = K extends AriaVariants
  ? `aria-${K}`
  : K extends AttributeVariants
    ? K
    : `data-${K}`

export type Attributes<V extends Variant> = {
  [K in keyof V as Attribute<K & string>]: V[K] | undefined
}

export default function getVariants<V extends Variant>(
  variant: V,
): Attributes<V> {
  const attributes: Record<string, Value | undefined> = {}

  for (const [key, value] of Object.entries(variant)) {
    let prop = `data-${key}`

    if (isAriaVariant(key)) {
      prop = `aria-${key}`
    } else if (isAttributeVariant(key)) {
      prop = key
    }

    attributes[prop] = value || undefined
  }

  return attributes as Attributes<V>
}
