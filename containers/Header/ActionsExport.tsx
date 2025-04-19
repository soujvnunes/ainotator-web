'use client'

import { Suspense } from 'react'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import datasetSlice from '@/slices/datasetSlice'

import useStoreState from '@/hooks/useStoreState'

import Dialog from '@/components/Dialog'
import IconButton from '@/components/IconButton'

import ActionsExportDownload from './ActionsExportDownload'
import ActionsExportViewer from './ActionsExportViewer'

export default function ActionsExport() {
  const annotations = useStoreState(datasetSlice.selectors.annotations)

  return (
    <Dialog
      size="lg"
      title="Validate dataset"
      description="View the provided dataset and provide a name for the file before downloading it."
      renderController={(open) => (
        <IconButton
          onClick={open}
          disabled={!annotations.length}
          aria-label="Export annotations in COCO format">
          <DocumentArrowDownIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <div className="grid grid-cols-2">
        <div className="h-full max-h-[calc(100vh-108px)] overflow-y-auto">
          <Suspense fallback="Loading...">
            <ActionsExportViewer />
          </Suspense>
        </div>
        <ActionsExportDownload />
      </div>
    </Dialog>
  )
}
