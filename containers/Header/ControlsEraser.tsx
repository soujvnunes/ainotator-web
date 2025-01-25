'use client'

import { Button } from '@headlessui/react'
import { PaintBrushIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function HeaderControlsEraser() {
  return (
    <Button
      disabled={true /* TODO */}
      className="relative inline-flex h-10 w-10 text-sm font-medium text-white/60 focus:outline-none disabled:cursor-not-allowed data-[hover]:bg-white data-[disabled]:text-white/60">
      <PaintBrushIcon className="m-auto size-6" />
      <span className="absolute bottom-0.5 right-1 h-5 w-5 rounded-full bg-black">
        <XMarkIcon className="size-4" />
      </span>
    </Button>
  )
}
