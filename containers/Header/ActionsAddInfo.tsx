'use client'

import { InformationCircleIcon } from '@heroicons/react/24/solid'

import datasetSlice from '@/slices/datasetSlice'

import classes from '@/helpers/classes'

import useStoreState from '@/hooks/useStoreState'

import Dialog from '@/components/Dialog'
import IconButton from '@/components/IconButton'

import ActionsAddInfoForm from './ActionsAddInfoForm'

export default function ActionsAddInfo() {
  const hasInfo = useStoreState(datasetSlice.selectors.hasInfo)

  return (
    <Dialog
      title="Info details"
      description="Fill in the information dataset details before exporting."
      renderController={(open) => (
        <IconButton
          onClick={open}
          aria-label="Add the dataset information"
          {...addAttrs({ unknown: !hasInfo })}>
          <InformationCircleIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <ActionsAddInfoForm />
    </Dialog>
  )
}

const addAttrs = classes('data-classes-unknown:text-red-400')
