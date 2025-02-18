import { cva } from 'class-variance-authority'

const button = {
  root: cva(
    'text-label inline-flex h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center px-4 data-disabled:cursor-not-allowed data-focus:outline-hidden',
    {
      variants: {
        variant: {
          filled:
            'bg-white text-black data-disabled:bg-white/60 data-disabled:text-black/60 data-hover:bg-white/60',
          text: 'text-white data-disabled:text-white/40 data-hover:bg-white/20',
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

export default button
