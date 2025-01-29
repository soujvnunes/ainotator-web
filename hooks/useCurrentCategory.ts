import { useMemo } from 'react'

import { annotatorColors } from '@/lib/annotator'

import useAppState from './useAppState'

export default function useCurrentCategory() {
  const id = useAppState((state) => state.annotator.current.category.id)
  const categories = useAppState((state) => state.annotator.added.categories)

  return useMemo(() => {
    const category = categories.find((category) => category.id === id)

    if (category == undefined) return

    return {
      ...category,
      color: `rgb(${annotatorColors.channel[category.color]} / 0.4)`,
    }
  }, [categories, id])
}
