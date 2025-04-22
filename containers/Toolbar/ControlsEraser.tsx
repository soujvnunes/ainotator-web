'use client'

import { PaintBrushIcon, XMarkIcon } from '@heroicons/react/24/solid'

import datasetSlice from '@/slices/datasetSlice'

import useAppState from '@/hooks/useAppState'

import IconButton from '@/components/IconButton'

export default function ControlsEraser() {
  const annotations = useAppState(datasetSlice.selectors.annotations)

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
