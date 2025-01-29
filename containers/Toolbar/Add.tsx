'use client'

import { PlusIcon } from '@heroicons/react/24/solid'

import { Dialog, IconButton } from '@/ui'

import AddForm from './AddForm'

export default function Add() {
  return (
    <Dialog
      title="Annotation Class"
      description="Define class names and assign a unique color to each one."
      renderController={(open) => (
        <IconButton
          variant="filled"
          size="lg"
          aria-label="Add categories to start annotating the image"
          onClick={open}>
          <PlusIcon className="size-6" />
        </IconButton>
      )}>
      <AddForm />
    </Dialog>
  )
}
