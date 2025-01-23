'use client'

import ToolbarExportForm from './ToolbarExportForm'
import useAppState from '@/hooks/useAppState'
import Dialog from '@/ui/Dialog'

export default function ToolbarExport() {
  const annotations = useAppState((state) => state.dataset.annotations)

  return (
    <Dialog
      title="Dataset Details"
      buttonProps={{
        disabled: !annotations.length,
        children: 'Export',
      }}>
      <ToolbarExportForm />
    </Dialog>
  )
}
