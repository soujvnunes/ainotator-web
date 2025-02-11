'use client'

import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

import IconButton from '@/ui/IconButton'

export default function ControlsMover() {
  return (
    <IconButton aria-label="Start moving current image">
      <ArrowsPointingOutIcon className="size-6" />
    </IconButton>
  )
}
