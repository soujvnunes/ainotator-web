'use client'

import {
  DocumentArrowDownIcon,
  PaintBrushIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'

import classes from '@/helpers/classes'

import useStoreState from '@/hooks/useStoreState'

import OnboardingAddFile from './OnboardingAddFile'

export default function Onboarding() {
  const mode = useStoreState((state) => state.annotator.mode)

  return (
    <section {...rootAttrs({ inert: mode !== 'waiting' })}>
      <p className="text-label text-white/60">AINotator WEB</p>
      <h2 className="mb-4 text-center text-4xl lg:text-6xl">
        Start by adding <br /> an image
      </h2>
      <ul className="inline-flex flex-col items-center text-white/60">
        <li className="flex items-center">
          <OnboardingAddFile />
        </li>
        {onboardingItems.map(({ Icon, label }) => (
          <li
            key={label}
            className="flex items-center">
            <span
              className="mr-4 flex h-12 w-12 bg-white text-black"
              aria-label={label}>
              <Icon className="m-auto size-6" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}

const rootAttrs = classes(
  'absolute z-10 flex h-full w-full flex-col items-center justify-center',
  'inert:hidden',
)
const onboardingItems = [
  { Icon: PlusIcon, label: 'Add the annotation categories' },
  { Icon: PaintBrushIcon, label: 'Use brush or polygon forms to annotate it' },
  {
    Icon: DocumentArrowDownIcon,
    label: 'Validate the dataset and export it in COCO format',
  },
]
