'use client'

import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { cva } from 'class-variance-authority'

import datasetSlice from '@/slices/datasetSlice'

import selectCurrentImage from '@/selectors/selectCurrentImage'

import useAppState from '@/hooks/useAppState'

import Dialog from '@/components/Dialog'
import IconButton from '@/components/IconButton'
import Tabs from '@/components/Tabs'

import ActionsLicensesAdd from './ActionsLicensesAdd'
import ActionsLicensesSelect from './ActionsLicensesSelect'

export default function ActionsLicenses() {
  const currentImage = useAppState(selectCurrentImage)
  const licenses = useAppState(datasetSlice.selectors.licenses)

  return (
    <Dialog
      title="License details"
      description="Fill in the license image details or select a previous one."
      renderController={(open) => (
        <IconButton
          aria-label="Select or add an image license"
          className={addAttrs({ licensed: !!currentImage?.license })}
          onClick={open}>
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

const addAttrs = cva('', {
  variants: {
    licensed: {
      false: 'text-red-400',
    },
  },
})
