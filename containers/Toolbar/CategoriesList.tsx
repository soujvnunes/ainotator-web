'use client'

import { useCallback } from 'react'

import { RadioGroup } from '@headlessui/react'

import annotatorSlice from '@/slices/annotatorSlice'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'

import AnnotationRadio from '@/components/AnnotationRadio'

export default function CategoriesList() {
  const dispatch = useAppDispatch()

  const isAnnotating = useAppState(annotatorSlice.selectors.isAnnotating)
  const categories = useAppState(annotatorSlice.selectors.categories)
  const currentCategoryId = useAppState(annotatorSlice.selectors.currentCategoryId)

  const handleCategory = useCallback(
    (id: number) => {
      dispatch(annotatorSlice.actions.setCategory(id))
      dispatch(annotatorSlice.actions.setMode('annotating'))
    },
    [dispatch],
  )

  return (
    <RadioGroup
      className="flex w-full overflow-x-auto"
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
