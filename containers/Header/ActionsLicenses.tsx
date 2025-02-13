'use client'

import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import selectCurrentImage from '@/selectors/selectCurrentImage'
import selectDatasetLicenses from '@/selectors/selectDatasetLicenses'

import classes from '@/helpers/classes'

import useStoreState from '@/hooks/useStoreState'

import Dialog from '@/components/Dialog'
import IconButton from '@/components/IconButton'
import Tabs from '@/components/Tabs'

import ActionsLicensesAdd from './ActionsLicensesAdd'
import ActionsLicensesSelect from './ActionsLicensesSelect'

export default function ActionsLicenses() {
  const currentImage = useStoreState(selectCurrentImage)
  const licenses = useStoreState(selectDatasetLicenses)

  return (
    <Dialog
      title="License details"
      description="Fill in the license image details or select a previous one."
      renderController={(open) => (
        <IconButton
          aria-label="Select or add an image license"
          onClick={open}
          {...addAttrs({ unlicensed: !currentImage?.license })}>
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
