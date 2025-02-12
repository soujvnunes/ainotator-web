import { useMemo } from 'react'

import annotatorColors from '@/consts/annotatorColors'

import useStoreState from './useStoreState'

export default function useCurrentCategory() {
  const category = useStoreState((state) => state.annotator.current.id.category)
  const categories = useStoreState((state) => state.annotator.categories)

  return useMemo(() => {
    if (!category) return

    const currentCategory = categories.find(({ id }) => id === category)

    if (!currentCategory?.color) return

    return {
      ...currentCategory,
      color: `rgb(${annotatorColors.classes.channel[currentCategory.color]} / 0.4)`,
    }
  }, [categories, category])
}
