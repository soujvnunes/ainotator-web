export const max = 40
export const min = 8


export function getTopPosition(value?: number) {
  if (typeof value === 'undefined') return 0

  return ((160 - 0) / (max - min)) * (value - min) - value / 2
}

export function getLeftPosition(value?: number) {
  if (typeof value === 'undefined') return 0

  return -0.5 * value + max / 2
}