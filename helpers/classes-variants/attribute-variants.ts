const attributeVariants = ['inert'] as const

export type AttributeVariants = (typeof attributeVariants)[number]
export default attributeVariants
