'use client'

import useAppState from '@/hooks/useAppState'
import Dialog from '@/ui/Dialog'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import ExportForm from './ExportForm'

export default function Export() {
  const annotations = useAppState((state) => state.dataset.annotations)

  return (
    <Dialog
      title="Dataset Details"
      buttonProps={{
        'aria-label': 'Export annotations in COCO format',
        disabled: !annotations.length,
        children: <DocumentArrowDownIcon className="m-auto size-6" />,
        className:
          'h-10 relative w-10 inline-flex text-sm font-medium text-white data-[hover]:text-white/60 data-[disabled]:text-white/40 data-[disabled]:cursor-not-allowed ',
      }}>
      <ExportForm />
    </Dialog>
  )
}
