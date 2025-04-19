'use client'

import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { cva } from 'class-variance-authority'

import datasetSlice from '@/slices/datasetSlice'

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
          className={addAttrs({ hasInfo })}>
          <InformationCircleIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <ActionsAddInfoForm />
    </Dialog>
  )
}

const addAttrs = cva('', {
  variants: {
    hasInfo: {
      false: 'text-red-400',
    },
  },
})
