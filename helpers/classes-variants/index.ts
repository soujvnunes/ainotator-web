import { twMerge } from 'tailwind-merge'

import prefixSet, { type BooleanObject } from './prefix-set'

type Set<D extends string, A extends string> =
  | { data: BooleanObject<D>; aria?: BooleanObject<A> }
  | { data?: BooleanObject<D>; aria: BooleanObject<A> }

export default function classes<D extends string, A extends string>(
  ...classNames: string[]
) {
  return function variants(set: Set<D, A>) {
    return {
      className: twMerge(classNames),
      ...prefixSet('data', set.data),
      ...prefixSet('aria', set.aria),
    }
  }
}
