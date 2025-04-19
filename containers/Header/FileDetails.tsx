'use client'

import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { cva } from 'class-variance-authority'

import selectCurrentImage from '@/selectors/selectCurrentImage'

import twMerge from '@/helpers/twMerge'

import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/components/IconButton'

export default function FileDetails() {
  const currentImage = useStoreState(selectCurrentImage)

  return (
    <div className="flex items-center space-x-1">
      <p className={twMerge(nameAttrs({ hasFile: !!currentImage?.file_name }))}>
        {currentImage?.file_name || 'No filed selected'}
      </p>
      <IconButton
        disabled={!currentImage?.file_name}
        aria-label="Expand">
        <ChevronDownIcon className="size-6" />
      </IconButton>
    </div>
  )
}

const nameAttrs = cva('text-caption text-white/60', {
  variants: {
    hasFile: {
      true: 'text-white',
    },
  },
})
