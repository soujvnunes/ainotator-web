import extendedTailwindMerge from './extended-tailwind-merge'
import getAttributes, { type Attribute } from './get-attributes'

export default function classes(...baseClassNames: string[]) {
  const baseClassName = extendedTailwindMerge(baseClassNames)
  const attributes = function attributes<A extends Attribute>(
    attribute: A,
    ...classNames: (string | undefined)[]
  ) {
    let className = baseClassName

    if (!!classNames.length) {
      className = extendedTailwindMerge(baseClassName, ...classNames)
    }

    return {
      className,
      ...getAttributes<A>(attribute),
    }
  }

  attributes['className'] = baseClassName

  return attributes
}
