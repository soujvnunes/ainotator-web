'use client'

import useAppState from '@/hooks/useAppState'
import Dialog from '@/ui/Dialog'
import IconButton from '@/ui/IconButton'
import { PlusIcon } from '@heroicons/react/24/solid'

import AddedCategories from './AddedCategories'
import AddForm from './AddForm'

export default function Add() {
  const mode = useAppState((state) => state.annotator.current.mode)

  return (
    <Dialog
      title="Annotation Class"
      description="Define class names and assign a unique color to each one."
      renderController={(open) => (
        <IconButton
          variant="filled"
          size="lg"
          onClick={open}
          disabled={!['editting', 'annotating'].includes(mode)}
          aria-label="Add categories to start annotating the image">
          <PlusIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <AddForm />
      <AddedCategories />
    </Dialog>
  )
}
