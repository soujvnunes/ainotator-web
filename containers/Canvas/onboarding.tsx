'use client'

import { classes } from '@/helpers'

import { useStoreState } from '@/hooks'

import OnboardingAddFile from './onboarding-add-file'
import onboardingItems from './onboarding-items'

export default function Onboarding() {
  const mode = useStoreState((state) => state.annotator.mode)

  return (
    <section {...rootVariants({ inert: mode !== 'waiting' })}>
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

const rootVariants = classes(
  'absolute z-10 flex h-full w-full flex-col items-center justify-center',
  'inert:hidden',
)
