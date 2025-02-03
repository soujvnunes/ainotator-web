import extendedTailwindMerge from './extended-tailwind-merge'
import getVariants, { type Variant } from './get-variants'

export default function classes(...classNames: string[]) {
  const className = extendedTailwindMerge(classNames)

  return function variants<V extends Variant>(variant: V) {
    return {
      className,
      ...getVariants<V>(variant),
    }
  }
}
