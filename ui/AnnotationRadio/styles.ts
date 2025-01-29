import { cva } from 'class-variance-authority'

import { typographyStyles } from '../Typography'

const annotationRadioStyles = {
  root: cva(
    'group inline-flex cursor-pointer text-white data-[disabled]:cursor-not-allowed data-[disabled]:text-white/60',
    {
      variants: {
        color: {
          red: 'bg-red-500',
          orange: 'bg-orange-500',
          amber: 'bg-amber-500',
          yellow: 'bg-yellow-500',
          lime: 'bg-lime-500',
          green: 'bg-green-500',
          emerald: 'bg-emerald-500',
          teal: 'bg-teal-500',
          cyan: 'bg-cyan-500',
          sky: 'bg-sky-500',
          blue: 'bg-blue-500',
          indigo: 'bg-indigo-500',
          violet: 'bg-violet-500',
          purple: 'bg-purple-500',
          fuchsia: 'bg-fuchsia-500',
          pink: 'bg-pink-500',
          rose: 'bg-rose-500',
          neutral: 'bg-neutral-500',
        },
        compact: {
          true: 'aspect-square w-full min-w-10 data-[disabled]:bg-opacity-40 data-[hover]:bg-opacity-60',
          false:
            'h-16 w-24 flex-col justify-between bg-opacity-60 data-[disabled]:bg-opacity-40',
        },
      },
      defaultVariants: {
        compact: false,
      },
    },
  ),
  slots: {
    root: cva('', {
      variants: {
        compact: {
          true: 'm-auto size-6 text-white opacity-0 group-data-[checked]:opacity-100 group-data-[hover]:opacity-100',
          false: 'flex',
        },
      },
    }),
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
            red: 'group-data-[checked]:text-red-500',
            orange: 'group-data-[checked]:text-orange-500',
            amber: 'group-data-[checked]:text-amber-500',
            yellow: 'group-data-[checked]:text-yellow-500',
            lime: 'group-data-[checked]:text-lime-500',
            green: 'group-data-[checked]:text-green-500',
            emerald: 'group-data-[checked]:text-emerald-500',
            teal: 'group-data-[checked]:text-teal-500',
            cyan: 'group-data-[checked]:text-cyan-500',
            sky: 'group-data-[checked]:text-sky-500',
            blue: 'group-data-[checked]:text-blue-500',
            indigo: 'group-data-[checked]:text-indigo-500',
            violet: 'group-data-[checked]:text-violet-500',
            purple: 'group-data-[checked]:text-purple-500',
            fuchsia: 'group-data-[checked]:text-fuchsia-500',
            pink: 'group-data-[checked]:text-pink-500',
            rose: 'group-data-[checked]:text-rose-500',
            neutral: 'group-data-[checked]:text-neutral-500',
          },
        },
      }),
      icon: cva('size-4'),
    },
  },
  label: typographyStyles.root({
    variant: 'label',
    className: 'truncate px-3 pb-1',
  }),
}

export default annotationRadioStyles
