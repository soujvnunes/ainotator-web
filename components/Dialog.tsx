'use client'

import { useCallback, useState } from 'react'

import {
  CloseButton,
  Dialog as HeadlessDialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Description,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

import twMerge from '@/helpers/twMerge'

import dialog from '@/styles/dialog'

import IconButton from './IconButton'

export interface DialogProps {
  title: string
  description: string
  onClose?(): void
  renderController(handleOpen: () => void): React.ReactNode
  className?: string
  size?: 'md' | 'lg'
}

export default function Dialog({
  title,
  children,
  renderController,
  onClose,
  description,
  className,
  size = 'md',
}: React.PropsWithChildren<DialogProps>) {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
    onClose?.()
  }, [onClose])

  return (
    <>
      {renderController(handleOpen)}
      <HeadlessDialog
        open={open}
        onClose={handleClose}
        className="relative z-10 focus:outline-hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/80 backdrop-blur-lg" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className={twMerge(dialog.root({ className, size }))}>
              <header className={dialog.header.root}>
                <DialogTitle className={dialog.header.title.root}>
                  <span className={dialog.header.title.text}>{title}</span>
                  <CloseButton
                    as={IconButton}
                    aria-label={`Close ${title} dialog`}
                    className={dialog.header.title.close.root}>
                    <XMarkIcon className={dialog.header.title.close.icon} />
                  </CloseButton>
                </DialogTitle>
                <Description className={dialog.header.description}>{description}</Description>
              </header>
              {children}
            </DialogPanel>
          </div>
        </div>
      </HeadlessDialog>
    </>
  )
}
