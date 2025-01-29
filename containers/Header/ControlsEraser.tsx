'use client'

import { PaintBrushIcon, XMarkIcon } from '@heroicons/react/24/solid'

import { IconButton } from '@/ui'

export default function HeaderControlsEraser() {
  return (
    <IconButton
      disabled={true /* TODO */}
      aria-label="Start erasing current drawning">
      <PaintBrushIcon className="size-6" />
      <span className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full bg-black">
        <XMarkIcon className="m-auto size-4" />
      </span>
    </IconButton>
  )
}
