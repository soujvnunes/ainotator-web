'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Squares2X2Icon } from '@heroicons/react/24/solid'

import annotatorSlice from '@/slices/annotatorSlice'

import useAppState from '@/hooks/useAppState'

import IconButton from '@/components/IconButton'

import ControlsEraser from './ControlsEraser'
import ControlsMover from './ControlsMover'
import ControlsResizer from './ControlsResizer'
import ControlsZoomIn from './ControlsZoomIn'
import ControlsZoomOut from './ControlsZoomOut'

export default function Controls() {
  const isAnnotating = useAppState(annotatorSlice.selectors.isAnnotating)

  return (
    <Popover>
      <PopoverButton
        size="lg"
        className="focus:outline-hidden"
        aria-label="Controls menu"
        disabled={!isAnnotating}
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
