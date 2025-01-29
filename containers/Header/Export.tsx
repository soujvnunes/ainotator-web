'use client'

import { useCallback } from 'react'

import { TabGroup, TabPanel, TabPanels } from '@headlessui/react'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import annotator from '@/lib/annotator'
import { tabs } from '@/lib/exportForm'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'

import { Dialog, IconButton, Tabs } from '@/ui'

import ExportInfo from './ExportInfo'
import ExportLicense from './ExportLicense'

export default function Export() {
  const dispatch = useAppDispatch()
  const annotations = useAppState((state) => state.dataset.annotations)
  const renderController = useCallback(
    (open: () => void) => (
      <IconButton
        onClick={() => {
          open()
          dispatch(annotator.actions.setMode('exporting'))
        }}
        disabled={!annotations.length}
        aria-label="Export annotations in COCO format">
        <DocumentArrowDownIcon className="m-auto size-6" />
      </IconButton>
    ),
    [dispatch, annotations.length],
  )

  return (
    <Dialog
      title="Dataset Details"
      description="Fill in the license and information dataset details to validate it before exporting."
      renderController={renderController}>
      <TabGroup>
        <Tabs value={tabs} />
        <TabPanels>
          <TabPanel>
            <ExportInfo />
          </TabPanel>
          <TabPanel>
            <ExportLicense />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Dialog>
  )
}
