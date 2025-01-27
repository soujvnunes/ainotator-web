import { cva } from 'class-variance-authority'

import typographyStyles from '../Typography/styles'

const annotationRadioStyles = {
  root: cva(
    'group inline-flex h-16 w-24 cursor-pointer flex-col justify-between truncate',
    {
      variants: {
        color: {
          red: 'bg-red-600',
          orange: 'bg-orange-700',
          amber: 'bg-amber-700',
          yellow: 'bg-yellow-700',
          lime: 'bg-lime-700',
          green: 'bg-green-700',
          emerald: 'bg-emerald-700',
          teal: 'bg-teal-700',
          cyan: 'bg-cyan-700',
          sky: 'bg-sky-700',
          blue: 'bg-blue-600',
          indigo: 'bg-indigo-600',
          violet: 'bg-violet-600',
          purple: 'bg-purple-600',
          fuchsia: 'bg-fuchsia-600',
          pink: 'bg-pink-600',
          rose: 'bg-rose-600',
          neutral: 'bg-neutral-600',
        },
      },
    },
  ),
  slots: {
    root: cva('flex'),
    item: {
      root: cva('inline-flex h-10 w-10 items-center justify-center', {
        variants: {
          type: {
            true: 'group-data-[checked]:bg-black group-data-[hover]:bg-black/60',
            false: '',
          },
          crowd: {
            true: 'ml-auto',
            false: '',
          },
          color: {
            red: 'group-data-[checked]:text-red-600',
            orange: 'group-data-[checked]:text-orange-700',
            amber: 'group-data-[checked]:text-amber-700',
            yellow: 'group-data-[checked]:text-yellow-700',
            lime: 'group-data-[checked]:text-lime-700',
            green: 'group-data-[checked]:text-green-700',
            emerald: 'group-data-[checked]:text-emerald-700',
            teal: 'group-data-[checked]:text-teal-700',
            cyan: 'group-data-[checked]:text-cyan-700',
            sky: 'group-data-[checked]:text-sky-700',
            blue: 'group-data-[checked]:text-blue-600',
            indigo: 'group-data-[checked]:text-indigo-600',
            violet: 'group-data-[checked]:text-violet-600',
            purple: 'group-data-[checked]:text-purple-600',
            fuchsia: 'group-data-[checked]:text-fuchsia-600',
            pink: 'group-data-[checked]:text-pink-600',
            rose: 'group-data-[checked]:text-rose-600',
            neutral: 'group-data-[checked]:text-neutral-600',
          },
        },
      }),
      icon: cva('size-4'),
    },
  },
  label: typographyStyles.root({ variant: 'label', className: 'px-3 pb-1' }),
}

export default annotationRadioStyles
