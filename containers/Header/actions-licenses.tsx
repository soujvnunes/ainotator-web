'use client'

import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import { classes } from '@/helpers'

import useStoreState from '@/hooks/useStoreState'

import Dialog from '@/ui/Dialog'
import IconButton from '@/ui/IconButton'
import Tabs from '@/ui/Tabs'

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
          {...addAttrs({
            unlicensed: !images.find(({ id }) => id === image)?.license,
          })}>
          <CheckBadgeIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <Tabs
        values={[
          {
            label: 'Add',
            panel: <ActionsLicensesAdd />,
          },
          {
            label: 'Select',
            panel: <ActionsLicensesSelect />,
            disabled: !licenses.length,
          },
        ]}
      />
    </Dialog>
  )
}

const addAttrs = classes('data-classes-unlicensed:text-red-400')
