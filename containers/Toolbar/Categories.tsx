'use client'

import { useCallback } from 'react'

import { RadioGroup } from '@headlessui/react'

import annotator from '@/lib/annotator'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'

import { AnnotationRadio } from '@/ui'

export default function Categories() {
  const dispatch = useAppDispatch()
  const mode = useAppState((state) => state.annotator.current.mode)
  const categories = useAppState((state) => state.annotator.added.categories)
  const category = useAppState((state) => state.annotator.current.category.id)
  const handleCategory = useCallback(
    (id: number) => {
      dispatch(annotator.actions.setMode('annotating'))
      dispatch(annotator.actions.setCategory({ id }))
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
