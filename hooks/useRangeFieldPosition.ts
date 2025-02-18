'use client'

import { useMemo } from 'react'

import parseString from '@/helpers/parseString'

interface RangeFieldPositionOptions {
  max?: number | string
  min?: number | string
}

export default function useRangeFieldPosition(
  value?: number,
  options?: RangeFieldPositionOptions,
) {
  return useMemo(() => {
    if (typeof value === 'undefined') return { x: 0, y: 0 }

    const max = parseString(options?.max)
    const min = parseString(options?.min)

    return {
      x: ((160 - 0) / (max - min)) * (value - min) - value / 2,
      y: -0.5 * value + max / 2,
    }
  }, [options?.max, options?.min, value])
}
