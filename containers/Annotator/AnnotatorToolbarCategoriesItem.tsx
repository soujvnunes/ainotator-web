'use client'

import getDatasetAnnotation from '@/helpers/getDatasetAnnotation'
import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'
import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import type { AnnotatorCategory, AnnotatorCurrent } from '@/stores/annotator'
import { Button } from '@headlessui/react'
import {
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export default function AnnotatorToolbarCategoriesItem(
  props: AnnotatorCategory,
) {
  const id = Date.now()
  const annotatorRefs = useAnnotatorRefs()
  const images = useAnnotatorState((state) => state.dataset.images)
  const mode = useAnnotatorState((state) => state.annotator.current.mode)
  const category = useAnnotatorState(
    (state) => state.annotator.current.category,
  )
  const dispatch = useAnnotatorDispatch()
  const isCurrent = category?.id === props.id
  const isDisabled = category && category.id !== props.id
  const handleCategory = useCallback(() => {
    const newCurrent: AnnotatorCurrent = isCurrent
      ? { mode: 'editting' }
      : { mode: 'annotating', category: props }

    dispatch.annotator.setCurrent(newCurrent)

    const canvas = annotatorRefs.canvas.current

    if (!canvas) return

    const datasetAnnotation = getDatasetAnnotation(canvas, {
      isCrowd: props.isCrowd,
      id: {
        image: images[0].id,
        category: props.id,
        annotation: id,
      },
    })

    if (datasetAnnotation) dispatch.dataset.addAnnotation(datasetAnnotation)
  }, [mode, images, props.id, annotatorRefs])

  return (
    <Button
      disabled={isDisabled}
      onClick={handleCategory}
      className={twMerge(
        'cursor-pointer w-24 h-16 px-3 py-2 text-sm border-y-4 font-medium leading-none border-y-[--border-color] tracking-wider text-left uppercase truncate bg-opacity-20 hover:bg-opacity-40',
        isCurrent ? 'border-b-transparent' : 'border-t-transparent',
        isDisabled && 'border-y-transparent cursor-not-allowed text-white/60',
      )}
      style={
        {
          backgroundColor: `rgb(${props.color} / var(--tw-bg-opacity))`,
          '--border-color': `rgb(${props.color})`,
        } as React.CSSProperties
      }>
      <span className="flex mb-3">
        {props.type === 'polygon' ? (
          <CubeTransparentIcon className="size-4" />
        ) : (
          <PaintBrushIcon className="size-4" />
        )}
        {props.isCrowd === 'yes' && <UserGroupIcon className="ml-2 size-4" />}
      </span>
      {props.name}
    </Button>
  )
}
