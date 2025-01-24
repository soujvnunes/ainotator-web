'use client'

import { PlusIcon } from '@heroicons/react/24/solid'
import ToolbarAddForm from './ToolbarAddForm'
import ToolbarAddedCategories from './ToolbarAddedCategories'
import useAppState from '@/hooks/useAppState'
import Dialog from '@/ui/Dialog'

export default function ToolbarAdd() {
  const mode = useAppState((state) => state.annotator.current.mode)

  return (
    <Dialog
      title="Annotation Class"
      buttonProps={{
        'aria-label': 'Add categories to start annotating the image',
        className:
          'h-16 w-16 flex-shrink-0 inline-flex bg-white py-2 px-4 text-sm font-medium text-black disabled:cursor-not-allowed focus:outline-none data-[hover]:bg-white/60 disabled:bg-white/60 disabled:text-black/60',
        disabled: !['editting', 'annotating'].includes(mode),
        children: <PlusIcon className="m-auto size-6" />,
      }}>
      <ToolbarAddForm />
      <ToolbarAddedCategories />
    </Dialog>
  )
}
