import extendedTailwindMerge from './extended-tailwind-merge'
import getVariants, { type Variant } from './get-variants'

export default function classes(...classNames: string[]) {
  const className = extendedTailwindMerge(classNames)

  return function variants<K extends string>(variant: Variant<K>) {
    return {
      className,
      ...getVariants(variant),
    }
  }
}
