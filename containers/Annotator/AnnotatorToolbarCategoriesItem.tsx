'use client'

import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'
import type { AnnotatorCategory } from '@/stores/annotator'
import { Button } from '@headlessui/react'
import { CubeTransparentIcon, PaintBrushIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

export default function AnnotatorToolbarCategoriesItem(
  props: AnnotatorCategory,
) {
  const action = useAnnotatorState((state) => state.annotator.action)
  const dispatch = useAnnotatorDispatch()
  const isAction =
    (action.name === 'annotating' && action.category.id) === props.id

  return (
    <Button
      className={twMerge(
        'cursor-pointer w-24 h-16 px-3 py-2 text-sm border-y-4 font-medium leading-none border-y-[--border-color] tracking-wider text-left uppercase truncate bg-opacity-20 hover:bg-opacity-40',
        isAction ? 'border-b-transparent' : ' border-t-transparent',
      )}
      onClick={() =>
        dispatch.annotator.setAction({
          name: 'annotating',
          category: props,
        })
      }
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
