'use client'

import { Button } from '@headlessui/react'
import { PaintBrushIcon, XCircleIcon } from '@heroicons/react/24/solid'

export default function HeaderControlsErase() {
  return (
    <Button className="h-10 relative w-10 inline-flex text-sm font-medium text-black/60 data-[hover]:text-black group disabled:cursor-not-allowed focus:outline-none bg-white/60 data-[hover]:bg-white data-[disabled]:bg-white/60 data-[disabled]:text-black/60">
      <PaintBrushIcon className="m-auto size-6" />
      <XCircleIcon className="absolute w-4 h-4 fill-red-800/60 right-1 bottom-1 group-data-[hover]:fill-red-400" />
    </Button>
  )
}
