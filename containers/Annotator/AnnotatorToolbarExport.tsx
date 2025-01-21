'use client'

import Link from 'next/link'
import {
  Button,
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { useState } from 'react'
import AnnotatorToolbarExportLicenseForm from './AnnotatorToolbarExportLicenseForm'
import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function AnnotatorToolbarExport() {
  const file = useAnnotatorState((state) => state.annotator.file)
  const [open, setOpen] = useState(false)

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Button
        onClick={handleOpen}
        disabled={!file}
        className="rounded-md data-[disabled]:text-white/60 data-[disabled]:pointer-events-none bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white">
        Export
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={handleClose}>
        <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-lg" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <DialogPanel
              as="form"
              transition
              className="w-full max-w-md bg-neutral-900 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle className="flex">
                <span className="sr-only">Licenses</span>
                <CloseButton className="inline-flex w-10 h-10 ml-auto hover:bg-white/10">
                  <XMarkIcon className="m-auto size-6" />
                </CloseButton>
              </DialogTitle>
              <AnnotatorToolbarExportLicenseForm />
              <div className="flex items-center mt-4">
                <Button className="inline-flex items-center justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/10 ">
                  Validate
                </Button>
                <Link
                  className="inline-flex data-[disabled]:text-white/40 data-[disabled]:bg-white/10 data-[disabled]:pointer-events-none items-center justify-center w-full px-4 text-xs uppercase font-semibold tracking-wider h-10	 text-white  data-[hover]:bg-white/10 "
                  href=""
                  data-disabled>
                  Export
                </Link>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
