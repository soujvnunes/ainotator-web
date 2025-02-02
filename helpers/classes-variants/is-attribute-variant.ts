import attributeVariants, { type AttributeVariants } from './attribute-variants'

export default function isAttributeVariant(
  params: string,
): params is AttributeVariants {
  return attributeVariants.includes(params as AttributeVariants)
}
