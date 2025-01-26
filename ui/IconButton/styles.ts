import { cva } from 'class-variance-authority'

const iconButtonStyles = {
  root: cva('', {
    variants: {
      size: { lg: 'h-16 w-16', md: 'h-10 w-10' },
    },
    defaultVariants: { size: 'md' },
  }),
}

export default iconButtonStyles
