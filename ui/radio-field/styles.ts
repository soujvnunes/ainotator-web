import { cva } from 'class-variance-authority'

import { buttonStyles } from '../button'
import { iconButtonStyles } from '../icon-button'

const radioFieldStyles = {
  root: cva('group flex', {
    variants: {
      vertical: {
        true: 'flex-col',
        false: '',
      },
    },
  }),
  radio: {
    root: cva(
      buttonStyles.root({
        variant: 'text',
        className: 'bg-neutral-800 grow',
      }),
      {
        variants: {
          vertical: {
            true: 'group pl-0 justify-start',
            false:
              'data-[checked]:data-[hover]:bg-white/60 data-[checked]:data-[disabled]:bg-white/40 data-[checked]:bg-white data-[checked]:text-black data-[checked]:data-[disabled]:text-black/80',
          },
        },
        defaultVariants: {
          vertical: false,
        },
      },
    ),
    button: {
      root: iconButtonStyles.root({
        className:
          'inline-flex mr-4 group-data-[checked]:group-data-[hover]:bg-white/60 group-data-[checked]:group-data-[disabled]:bg-white/40 group-data-[checked]:bg-white group-data-[checked]:text-black group-data-[checked]:group-data-[disabled]:text-black/60',
      }),
      icon: 'invisible m-auto group-data-[checked]:visible size-6',
    },
  },
}

export default radioFieldStyles
