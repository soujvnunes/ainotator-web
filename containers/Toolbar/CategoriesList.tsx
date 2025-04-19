'use client'

import { useCallback } from 'react'

import { RadioGroup } from '@headlessui/react'

import annotatorSlice from '@/slices/annotatorSlice'

import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import AnnotationRadio from '@/components/AnnotationRadio'

export default function CategoriesList() {
  const dispatch = useStoreDispatch()
  const isAnnotating = useStoreState(annotatorSlice.selectors.isAnnotating)
  const categories = useStoreState(annotatorSlice.selectors.categories)
  const currentCategoryId = useStoreState(annotatorSlice.selectors.currentCategoryId)
  const handleCategory = useCallback(
    (id: number) => {
      dispatch(annotatorSlice.actions.setCategory(id))
      dispatch(annotatorSlice.actions.setMode('annotating'))
    },
    [dispatch],
  )

  return (
    <RadioGroup
      className="flex w-full overflow-y-hidden"
      disabled={!isAnnotating}
      value={currentCategoryId}
      onChange={handleCategory}>
      {categories.map(({ id, name, ...category }) => (
        <AnnotationRadio
          key={id}
          value={id}
          isCrowd={category.isCrowd}
          type={category.type}
          color={category.color}>
          {name}
        </AnnotationRadio>
      ))}
    </RadioGroup>
  )
}
