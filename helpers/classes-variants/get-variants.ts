import { type AriaVariants } from './aria-variants'
import { type AttributeVariants } from './attribute-variants'
import isAriaVariant from './is-aria-variant'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import isAttributeVariant from './is-attribute-variant'

export type Variant<V extends string> = Partial<
  Record<V | AriaVariants | AttributeVariants, boolean>
>
export type Property<V extends string> = V extends AriaVariants
  ? `aria-${V}`
  : V extends AttributeVariants
    ? V
    : `data-${V}`

export default function getVariants<V extends string>(
  variant: Variant<V>,
): Record<Property<V>, boolean | undefined> {
  const attributes: Record<string, boolean | undefined> = {}

  for (const [key, value] of Object.entries(variant) as [V, boolean][]) {
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
