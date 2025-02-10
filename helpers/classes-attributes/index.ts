import getAttributes, { type Attribute } from './get-attributes'
import twMerge from './tw-merge'

export { twMerge }
export default function classes(...baseClassNames: string[]) {
  const baseClassName = twMerge(baseClassNames)
  const attributes = function attributes<A extends Attribute>(
    attribute: A,
    ...classNames: (string | undefined)[]
  ) {
    let className = baseClassName

    if (!!classNames.length) {
      className = twMerge(baseClassName, ...classNames)
    }

    return {
      className,
      ...getAttributes<A>(attribute),
    }
  }

  attributes['className'] = baseClassName

  return attributes
}
