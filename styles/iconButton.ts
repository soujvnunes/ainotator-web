import { cva } from 'class-variance-authority'

const iconButton = {
  root: cva('relative px-0', {
    variants: {
      size: {
        lg: 'h-16 w-16',
        md: 'h-10 w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }),
}

export default iconButton
