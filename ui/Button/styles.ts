import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

import typographyStyles from '../Typography/styles'

const buttonStyles = {
  root: cva(
    twMerge(
      typographyStyles.root({
        variant: 'label',
        className:
          'inline-flex flex-shrink-0 items-center justify-center data-[disabled]:cursor-not-allowed data-[focus]:outline-none',
      }),
    ),
    {
      variants: {
        variant: {
          filled:
            'bg-white text-black data-[disabled]:bg-white/60 data-[hover]:bg-white/60 data-[disabled]:text-black/60',
          text: 'text-white data-[disabled]:bg-neutral-800 data-[hover]:bg-white/20 data-[disabled]:text-white/60',
        },
        size: {
          lg: 'h-16 min-w-16 px-4 text-sm',
          md: 'h-10 min-w-10 px-2 text-xs',
        },
        fullWidth: { true: 'w-full', false: '' },
      },
      defaultVariants: {
        variant: 'text',
        size: 'md',
        fullWidth: false,
      },
    },
  ),
}

export default buttonStyles
