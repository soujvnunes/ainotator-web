'use client'

import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid'

import IconButton from '@/ui/IconButton'

export default function ControlsZoomIn() {
  return (
    <IconButton aria-label="Start zooming the current image in">
      <MagnifyingGlassPlusIcon className="size-6" />
    </IconButton>
  )
}
