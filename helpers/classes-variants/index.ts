import { twMerge } from 'tailwind-merge'

import getVariants, { type Variant } from './get-variants'

export default function classes(...classNames: string[]) {
  return function variants<K extends string>(variant: Variant<K>) {
    return {
      className: twMerge(classNames),
      ...getVariants(variant),
    }
  }
}
