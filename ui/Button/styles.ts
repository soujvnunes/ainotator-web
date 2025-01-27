import { cva } from 'class-variance-authority'

const buttonStyles = {
  root: cva(
    'text-label inline-flex h-10 min-w-10 flex-shrink-0 items-center justify-center px-4 text-xs data-[disabled]:cursor-not-allowed data-[focus]:outline-none',
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
