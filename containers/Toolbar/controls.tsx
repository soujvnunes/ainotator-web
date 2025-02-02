'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Squares2X2Icon } from '@heroicons/react/24/solid'

import { useStoreState } from '@/hooks'

import { IconButton } from '@/ui'

import ControlsEraser from './controls-eraser'
import ControlsMover from './controls-mover'
import ControlsResizer from './controls-resizer'
import ControlsZoomIn from './controls-zoom-in'
import ControlsZoomOut from './controls-zoom-out'

export default function Controls() {
  const mode = useStoreState((state) => state.annotator.mode)

  return (
    <Popover>
      <PopoverButton
        size="lg"
        className="focus:outline-none"
        aria-label="Controls menu"
        disabled={!['editting', 'annotating'].includes(mode)}
        as={IconButton}>
        <Squares2X2Icon className="size-6" />
      </PopoverButton>
      <PopoverPanel
        modal
        transition
        anchor="top end"
        className="z-10 bg-black">
        <ControlsResizer />
        <div className="flex justify-center">
          <ControlsEraser />
          <ControlsMover />
          <ControlsZoomOut />
          <ControlsZoomIn />
        </div>
      </PopoverPanel>
    </Popover>
  )
}
