'use client'

import { Button } from '@headlessui/react'
import { PaintBrushIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function HeaderControlsEraser() {
  return (
    <Button className="h-10 relative w-10 inline-flex text-sm font-medium text-white/60 data-[hover]:text-black group disabled:cursor-not-allowed focus:outline-none  data-[hover]:bg-white data-[disabled]:bg-white/60 data-[disabled]:text-black/60">
      <PaintBrushIcon className="m-auto size-6" />
      <span className="absolute w-5 h-5 bg-black rounded-full right-1 bottom-0.5">
        <XMarkIcon className="size-4" />
      </span>
    </Button>
  )
}
