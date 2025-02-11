'use client'

import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { classes } from '@/helpers'

import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/ui/IconButton'

export default function FileDetails() {
  const id = useStoreState((state) => state.annotator.current.id.image)
  const images = useStoreState((state) => state.dataset.images)
  const image = images.find((image) => image.id === id)

  return (
    <div className="flex items-center space-x-1">
      <p {...nameAttrs({ file: !!image?.file_name })}>
        {image?.file_name || 'No filed selected'}
      </p>
      <IconButton
        disabled={!image?.file_name}
        aria-label="Expand">
        <ChevronDownIcon className="size-6" />
      </IconButton>
    </div>
  )
}

const nameAttrs = classes(
  'text-caption text-white/60',
  'data-classes-file:text-white',
)
