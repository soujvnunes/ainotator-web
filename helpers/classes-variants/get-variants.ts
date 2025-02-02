import { type AriaVariants } from './aria-variants'
import { type AttributeVariants } from './attribute-variants'
import isAriaVariant from './is-aria-variant'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import isAttributeVariant from './is-attribute-variant'

export type Variant<K extends string> = {
  [Key in K | AriaVariants | AttributeVariants]?: boolean
}

export default function getVariants<K extends string>(
  variant: Variant<K | AriaVariants | AttributeVariants>,
) {
  const attributes: Record<string, boolean | undefined> = {}

  for (const [key, value] of Object.entries(variant) as [K, boolean][]) {
    let prop: string

    if (isAriaVariant(key)) {
      prop = `aria-${key}`
      // TODO: uncomment when update to tailwind 4 https://tailwindcss.com/docs/hover-focus-and-other-states#styling-inert-elements
    } /* else if (isAttributeVariant(key)) {
          prop = key
        } */ else {
      prop = `data-${key}`
    }

    attributes[prop] = value || undefined
  }

  return attributes
}
