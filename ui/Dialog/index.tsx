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

import { twMerge } from '@/helpers'

import IconButton from '../icon-button'
import dialogStyles from './styles'

export interface DialogProps {
  title: string
  description: string
  onClose?(): void
  renderController(handleOpen: () => void): React.ReactNode
  className?: string
}

export default function Dialog({
  title,
  children,
  renderController,
  onClose,
  description,
  className,
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
              className={twMerge(dialogStyles.root({ className }))}>
              <header className={dialogStyles.header.root}>
                <DialogTitle className={dialogStyles.header.title.root}>
                  <span className={dialogStyles.header.title.text}>
                    {title}
                  </span>
                  <CloseButton
                    as={IconButton}
                    aria-label={`Close ${title} dialogStyles`}
                    className={dialogStyles.header.title.close.root}>
                    <XMarkIcon
                      className={dialogStyles.header.title.close.icon}
                    />
                  </CloseButton>
                </DialogTitle>
                <Description className={dialogStyles.header.description}>
                  {description}
                </Description>
              </header>
              {children}
            </DialogPanel>
          </div>
        </div>
      </HeadlessDialog>
    </>
  )
}
