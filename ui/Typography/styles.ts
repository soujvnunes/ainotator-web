import { cva } from 'class-variance-authority'

const typographyStyles = {
  root: cva('', {
    variants: {
      variant: {
        label: 'text-xs font-semibold uppercase tracking-widest',
        caption: 'text-xs font-semibold',
      },
    },
  }),
}

export default typographyStyles
