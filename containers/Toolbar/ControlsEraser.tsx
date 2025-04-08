'use client'

import { PaintBrushIcon, XMarkIcon } from '@heroicons/react/24/solid'

import dataset from '@/reducers/dataset'

import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/components/IconButton'

export default function ControlsEraser() {
  const annotations = useStoreState(dataset.selectors.annotations)

  return (
    <IconButton
      disabled={!annotations.length}
      aria-label="Start erasing current drawning">
      <PaintBrushIcon className="size-6" />
      <span className="absolute right-1.5 bottom-1.5 h-4 w-4 rounded-full bg-black text-red-400">
        <XMarkIcon className="m-auto size-4" />
      </span>
    </IconButton>
  )
}
