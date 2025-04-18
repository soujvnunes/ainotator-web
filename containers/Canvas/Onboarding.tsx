'use client'

import { DocumentArrowDownIcon, PlusIcon } from '@heroicons/react/24/solid'

import annotatorSlice from '@/slices/annotatorSlice'

import useStoreState from '@/hooks/useStoreState'

import OnboardingAddFile from './OnboardingAddFile'

export default function Onboarding() {
  const isWaiting = useStoreState(annotatorSlice.selectors.isWaiting)

  return (
    <section
      inert={!isWaiting}
      className="absolute z-10 flex h-full w-full flex-col items-center justify-center inert:hidden">
      <p className="text-label mb-2 block text-white/60">How to use</p>
      <h2 className="mb-4 text-center text-4xl lg:mb-10 lg:text-6xl">Start by adding an image</h2>
      <ul className="inline-flex flex-col items-center text-white/60">
        <li className="flex items-center">
          <OnboardingAddFile />
        </li>
        {onboardingItems.map(({ Icon, label }) => (
          <li
            key={label}
            className="text-label flex items-center pr-4">
            <span className="mr-4 flex h-10 w-10 bg-white text-black">
              <Icon className="m-auto size-6" />
            </span>
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}

const onboardingItems = [
  { Icon: PlusIcon, label: 'Add an annotation class' },
  { Icon: DocumentArrowDownIcon, label: 'Review & export them in coco format' },
]
