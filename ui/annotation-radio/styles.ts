import { cva } from 'class-variance-authority'

import { annotatorColorsClasses } from '@/lib'

import { typographyStyles } from '../typography'

const annotationRadioStyles = {
  root: cva(
    'group inline-flex cursor-pointer text-white data-[disabled]:cursor-not-allowed data-[disabled]:text-white/60',
    {
      variants: {
        color: { ...annotatorColorsClasses.background },
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
          color: { ...annotatorColorsClasses.color },
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
