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
import AnnotatorToolbarAddForm from './AnnotatorToolbarAddForm'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useAnnotatorState } from '@/providers/AnnotatorProvider'

export default function AnnotatorToolbarAdd() {
  const mode = useAnnotatorState((state) => state.annotator.mode)
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
        disabled={!['editting', 'annotating'].includes(mode.name)}
        className="h-16 w-16 flex-shrink-0 inline-flex bg-white py-2 px-4 text-sm font-medium text-black disabled:cursor-not-allowed focus:outline-none data-[hover]:bg-white/60 disabled:bg-white/60 disabled:text-black/60">
        <PlusIcon className="m-auto size-6" />
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
                Annotation Class
                <CloseButton className="inline-flex w-10 h-10 ml-auto hover:bg-white/5">
                  <XMarkIcon className="m-auto size-6" />
                </CloseButton>
              </DialogTitle>
              <AnnotatorToolbarAddForm />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
