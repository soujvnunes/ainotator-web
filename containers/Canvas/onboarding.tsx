import { classNames } from '@/helpers'

import { useStoreState } from '@/hooks'

import { typographyStyles } from '@/ui'

import onboardingItems from './onboarding-items'

const rootProps = classNames(
  'relative flex h-full w-full flex-col items-center justify-center aria-hidden:hidden',
)

export default function Onboarding() {
  const mode = useStoreState((state) => state.annotator.mode)

  return (
    <section {...rootProps({ aria: { hidden: mode !== 'waiting' } })}>
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
        {onboardingItems.map(({ Icon, label }) => (
          <li
            key={label}
            className="flex items-center">
            <span
              className="mr-2 flex h-10 w-10 bg-white text-black"
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
