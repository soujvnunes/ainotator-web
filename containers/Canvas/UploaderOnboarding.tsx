'use client'

import {
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  PaintBrushIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'

import { IconButton, typographyStyles } from '@/ui'

export default function UploaderOnboarding() {
  return (
    <section className="m-auto flex flex-col items-center">
      <p
        className={typographyStyles.root({
          variant: 'label',
          className: 'mb-2 text-white/60',
        })}>
        AINotator WEB
      </p>
      <h2 className="mb-4 text-center text-4xl lg:text-6xl">
        Start by adding <br /> an image
      </h2>
      <ul className="inline-flex flex-col items-center text-white/60">
        {items.map(({ Icon, label }) => (
          <li
            key={label}
            className="flex items-center">
            <IconButton
              variant="filled"
              className="mr-2"
              aria-label={label}>
              <Icon className="size-6" />
            </IconButton>
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}

const items = [
  { Icon: DocumentArrowUpIcon, label: 'Pick your image' },
  { Icon: PlusIcon, label: 'Add classes names' },
  { Icon: PaintBrushIcon, label: 'Annotate your image' },
  { Icon: DocumentArrowDownIcon, label: 'Export in COCO format' },
]
