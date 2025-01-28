'use client'

import { TabGroup } from '@headlessui/react'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import { tabs } from '@/lib/exportForm'

import useAppState from '@/hooks/useAppState'

import { Dialog, IconButton, Tabs } from '@/ui'

import ExportForm from './ExportForm'

export default function Export() {
  const annotations = useAppState((state) => state.dataset.annotations)

  return (
    <Dialog
      title="Dataset Details"
      description="Fill in the license and information dataset details to validate it before exporting."
      renderController={(open) => (
        <IconButton
          onClick={open}
          disabled={!annotations.length}
          aria-label="Export annotations in COCO format">
          <DocumentArrowDownIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <TabGroup>
        <Tabs value={tabs} />
        <ExportForm />
      </TabGroup>
    </Dialog>
  )
}
