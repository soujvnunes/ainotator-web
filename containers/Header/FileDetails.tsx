'use client'

import { ChevronDownIcon } from '@heroicons/react/24/solid'

import selectCurrentImage from '@/selectors/selectCurrentImage'

import classes from '@/helpers/classes'

import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/components/IconButton'

export default function FileDetails() {
  const currentImage = useStoreState(selectCurrentImage)

  return (
    <div className="flex items-center space-x-1">
      <p {...nameAttrs({ file: !!currentImage?.file_name })}>
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

const nameAttrs = classes('text-caption text-white/60', 'data-classes-file:text-white')
