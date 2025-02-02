'use client'

import { TabGroup, TabPanel, TabPanels } from '@headlessui/react'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import { classes } from '@/helpers'

import { useStoreState } from '@/hooks'

import { Dialog, IconButton, Tabs } from '@/ui'

import ActionsLicensesAdd from './actions-licenses-add'
import ActionsLicensesSelect from './actions-licenses-select'

export default function ActionsLicenses() {
  const image = useStoreState((state) => state.annotator.current.id.image)
  const images = useStoreState((state) => state.dataset.images)
  const licenses = useStoreState((state) => state.dataset.licenses)

  return (
    <Dialog
      title="License details"
      description="Fill in the license image details or select a previous one."
      renderController={(open) => (
        <IconButton
          onClick={open}
          aria-label="Select or add an image license"
          {...iconButtonVariants({
            unlicensed: !images.find(({ id }) => id === image)?.license,
          })}>
          <CheckBadgeIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <TabGroup>
        <Tabs
          value={['Add', { children: 'Select', disabled: !licenses.length }]}
        />
        <TabPanels>
          <TabPanel>
            <ActionsLicensesAdd />
          </TabPanel>
          <TabPanel>
            <ActionsLicensesSelect />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Dialog>
  )
}

const iconButtonVariants = classes('data-unlicensed:text-red-400')
