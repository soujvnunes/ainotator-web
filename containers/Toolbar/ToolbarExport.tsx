'use client'

import {
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useCallback, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import ToolbarExportForm from './ToolbarExportForm'
import useAppState from '@/hooks/useAppState'

export default function ToolbarExport() {
  const annotations = useAppState((state) => state.dataset.annotations)
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Button
        onClick={handleOpen}
        disabled={!annotations.length}
        className="rounded-md data-[disabled]:text-white/60 data-[disabled]:pointer-events-none bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white">
        Export
      </Button>
      <Dialog
        open={open}
        className="relative z-10 focus:outline-none"
        onClose={handleClose}>
        <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-lg" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <DialogPanel
              transition
              className="w-full max-w-md bg-neutral-900 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle className="flex items-center pl-4 text-xs font-medium tracking-wider uppercase bg-neutral-800">
                Dataset Details
                <CloseButton className="inline-flex w-10 h-10 ml-auto hover:bg-white/5">
                  <XMarkIcon className="m-auto size-6" />
                </CloseButton>
              </DialogTitle>
              <ToolbarExportForm />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
