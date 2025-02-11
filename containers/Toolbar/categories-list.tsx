'use client'

import { useCallback } from 'react'

import { RadioGroup } from '@headlessui/react'

import { annotator } from '@/reducers'

import { useStoreDispatch, useStoreState } from '@/hooks'

import AnnotationRadio from '@/ui/AnnotationRadio'

export default function CategoriesList() {
  const dispatch = useStoreDispatch()
  const mode = useStoreState((state) => state.annotator.mode)
  const categories = useStoreState((state) => state.annotator.categories)
  const category = useStoreState((state) => state.annotator.current.id.category)
  const handleCategory = useCallback(
    (id: number) => {
      dispatch(annotator.actions.setCategory(id))
      dispatch(annotator.actions.setMode('annotating'))
    },
    [dispatch],
  )

  return (
    <RadioGroup
      className="flex w-full overflow-y-hidden"
      disabled={!['editting', 'annotating'].includes(mode)}
      value={category}
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
