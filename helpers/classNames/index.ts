import { twMerge } from 'tailwind-merge'

export default function classNames<D extends string, A extends string>(
  className: string,
) {
  return function props(
    set: { data?: Record<D, boolean>; aria?: Record<A, boolean> },
    style?: { [key: string]: string | number },
  ) {
    const dataSet = {} as Record<`data-${D}`, boolean | undefined>
    const ariaSet = {} as Record<`aria-${A}`, boolean | undefined>

    if (set.data) {
      for (const [data, value] of Object.entries<boolean>(set.data)) {
        dataSet[`data-${data as D}`] = value || undefined
      }
    }

    if (set.aria) {
      for (const [aria, value] of Object.entries<boolean>(set.aria)) {
        ariaSet[`aria-${aria as A}`] = value || undefined
      }
    }

    return {
      className: twMerge(className),
      style: style as React.CSSProperties | undefined,
      ...dataSet,
      ...ariaSet,
    }
  }
}
