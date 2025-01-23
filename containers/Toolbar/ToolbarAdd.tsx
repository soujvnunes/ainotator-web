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
        disabled: !['editting', 'annotating'].includes(mode),
        children: <PlusIcon className="m-auto size-6" />,
      }}>
      <ToolbarAddForm />
      <ToolbarAddedCategories />
    </Dialog>
  )
}
