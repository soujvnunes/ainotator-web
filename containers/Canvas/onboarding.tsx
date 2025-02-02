'use client'

import { classes } from '@/helpers'

import { useStoreState } from '@/hooks'

import { typographyStyles } from '@/ui'

import OnboardingAddFile from './onboarding-add-file'
import onboardingItems from './onboarding-items'

const rootVariants = classes(
  'absolute flex h-full w-full flex-col items-center justify-center',
  /**
   * TODO: remove when update to tailwind 4
   * https://tailwindcss.com/docs/hover-focus-and-other-states#styling-inert-elements
   */
  'data-[inert]:hidden',
)

export default function Onboarding() {
  const mode = useStoreState((state) => state.annotator.mode)

  return (
    <section {...rootVariants({ inert: mode !== 'waiting' })}>
      <p
        className={typographyStyles.root({
          variant: 'label',
          className: 'text-white/60',
        })}>
        AINotator WEB
      </p>
      <h2 className="mb-4 text-center text-4xl lg:text-6xl">
        Start by adding <br /> an image
      </h2>
      <ul className="z-10 inline-flex flex-col items-center text-white/60">
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
      <div className="absolute inset-0 bg-[url(/rapport.png)] from-black/20 to-black/0 bg-repeat [mask-image:radial-gradient(circle_at_center,_var(--tw-gradient-stops))]" />
    </section>
  )
}
