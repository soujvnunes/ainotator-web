import { cva } from 'class-variance-authority'

import { typographyStyles } from '../typography'

const buttonStyles = {
  root: cva(
    typographyStyles.root({
      variant: 'label',
      className:
        'inline-flex h-10 min-w-10 flex-shrink-0 cursor-pointer items-center justify-center px-4 data-[disabled]:cursor-not-allowed data-[focus]:outline-none',
    }),
    {
      variants: {
        variant: {
          filled:
            'bg-white text-black data-[disabled]:bg-white/60 data-[hover]:bg-white/60 data-[disabled]:text-black/60',
          text: 'text-white data-[hover]:bg-white/20 data-[disabled]:text-white/40',
        },
        fullWidth: { true: 'w-full', false: '' },
      },
      defaultVariants: {
        variant: 'text',
        fullWidth: false,
      },
    },
  ),
}

export default buttonStyles
