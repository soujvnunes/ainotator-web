'use client'

import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { useStoreState } from '@/hooks'

import { IconButton, typographyStyles } from '@/ui'

export default function FileDetails() {
  const id = useStoreState((state) => state.annotator.current.id.image)
  const images = useStoreState((state) => state.dataset.images)
  const image = images.find((image) => image.id === id)

  return (
    <div className="flex items-center space-x-1">
      <p
        data-file={image?.file_name || undefined}
        className={typographyStyles.root({
          variant: 'caption',
          className: 'text-white/60 data-[file]:text-white',
        })}>
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
