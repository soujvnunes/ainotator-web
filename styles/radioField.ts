import { cva } from 'class-variance-authority'

import button from './button'
import iconButtonStyles from './iconButton'

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
      button.root({
        variant: 'text',
        className: 'grow bg-neutral-800',
      }),
      {
        variants: {
          vertical: {
            true: 'group justify-start pl-0',
            false:
              'data-checked:bg-white data-checked:text-black data-checked:data-disabled:bg-white/40 data-checked:data-disabled:text-black/80 data-checked:data-hover:bg-white/60',
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
          'inline-flex mr-4 group-data-hover:group-data-checked:bg-white/60 group-data-disabled:group-data-checked:bg-white/40 group-data-checked:bg-white group-data-checked:text-black group-data-disabled:group-data-checked:text-black/60',
      }),
      icon: 'invisible m-auto group-data-checked:visible size-6',
    },
  },
}

export default radioFieldStyles
