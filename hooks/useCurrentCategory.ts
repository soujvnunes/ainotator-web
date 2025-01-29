import { useMemo } from 'react'

import useAppState from './useAppState'

export default function useCurrentCategory() {
  const id = useAppState((state) => state.annotator.current.category.id)
  const categories = useAppState((state) => state.annotator.added.categories)

  return useMemo(
    () => categories.find((category) => category.id === id),
    [categories, id],
  )
}
