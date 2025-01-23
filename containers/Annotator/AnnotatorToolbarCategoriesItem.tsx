'use client'

import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'
import type { AnnotatorCategory } from '@/stores/annotator'
import { Button } from '@headlessui/react'
import { CubeTransparentIcon, PaintBrushIcon } from '@heroicons/react/24/solid'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export default function AnnotatorToolbarCategoriesItem(
  props: AnnotatorCategory,
) {
  const mode = useAnnotatorState((state) => state.annotator.mode)
  const dispatch = useAnnotatorDispatch()
  const handleCategory = useCallback(() => {
    dispatch.annotator.setMode({
      name: 'annotating',
      category: props,
    })
  }, [])
  const isAction = (mode.name === 'annotating' && mode.category.id) === props.id

  return (
    <Button
      className={twMerge(
        'cursor-pointer w-24 h-16 px-3 py-2 text-sm border-y-4 font-medium leading-none border-y-[--border-color] tracking-wider text-left uppercase truncate bg-opacity-20 hover:bg-opacity-40',
        isAction ? 'border-b-transparent' : ' border-t-transparent',
      )}
      onClick={handleCategory}
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
      </span>
      {props.name}
    </Button>
  )
}
