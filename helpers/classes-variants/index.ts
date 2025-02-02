import { twMerge } from 'tailwind-merge'

import getVariants, { type Variant } from './get-variants'

export default function classes(...classNames: string[]) {
  const className = twMerge(classNames)

  return function variants<K extends string>(variant: Variant<K>) {
    return {
      className,
      ...getVariants(variant),
    }
  }
}
