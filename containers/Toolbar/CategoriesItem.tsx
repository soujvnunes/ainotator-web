'use client'

import { useCallback } from 'react'

import { Button } from '@headlessui/react'
import {
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

import annotator, { type AnnotatorCategory } from '@/lib/annotator'
import dataset from '@/lib/dataset'
import getDatasetAnnotation from '@/lib/getDatasetAnnotation'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'

export default function CategoriesItem(props: AnnotatorCategory) {
  const id = Date.now()
  const annotatorRefs = useCanvasRefs()
  const images = useAppState((state) => state.dataset.images)
  const category = useAppState((state) => state.annotator.current.category)
  const dispatch = useAppDispatch()
  const isCurrent = category?.id === props.id
  const isDisabled = category && category.id !== props.id
  const handleCategory = useCallback(() => {
    dispatch(annotator.actions.setMode(isCurrent ? 'editting' : 'annotating'))
    dispatch(annotator.actions.setCategory(props))

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

    if (!datasetAnnotation) return

    dispatch(dataset.actions.addAnnotation(datasetAnnotation))
    dispatch(
      dataset.actions.addCategory({
        supercategory: props.supercategory,
        id: props.id,
        name: props.name,
      }),
    )
  }, [isCurrent, annotatorRefs.canvas, props, images, id, dispatch])

  return (
    <Button
      disabled={isDisabled}
      onClick={handleCategory}
      className={twMerge(
        'h-16 w-24 cursor-pointer truncate border-y-4 border-y-[--border-color] bg-opacity-20 px-3 py-2 text-left text-sm font-medium uppercase leading-none tracking-wider hover:bg-opacity-40',
        isCurrent ? 'border-b-transparent' : 'border-t-transparent',
        isDisabled && 'cursor-not-allowed border-y-transparent text-white/60',
      )}
      style={
        {
          backgroundColor: `rgb(${props.color} / var(--tw-bg-opacity))`,
          '--border-color': `rgb(${props.color})`,
        } as React.CSSProperties
      }>
      <span className="mb-3 flex">
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
