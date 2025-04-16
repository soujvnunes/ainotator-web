import { cva } from 'class-variance-authority'

const annotationRadio = {
  root: cva(
    'group inline-flex cursor-pointer bg-(--color)/(--alpha,100%) text-white data-disabled:cursor-not-allowed data-disabled:text-white/60',
    {
      variants: {
        compact: {
          true: 'aspect-square w-full min-w-10 data-disabled:[--alpha:40%] data-hover:[--alpha:60%]',
          false: 'h-16 w-24 flex-col justify-between [--alpha:60%] data-disabled:[--alpha:40%]',
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
          true: 'm-auto size-6 text-white opacity-0 group-data-checked:opacity-100 group-data-hover:opacity-100',
          false: 'flex',
        },
      },
    }),
    item: {
      root: cva('inline-flex h-10 w-10 items-center justify-center', {
        variants: {
          type: {
            true: 'group-data-checked:bg-black group-data-checked:text-(--color) group-data-hover:bg-black/60',
            false: '',
          },
          crowd: {
            true: 'ml-auto',
            false: '',
          },
        },
      }),
      icon: cva('size-4'),
    },
  },
  label: 'text-label truncate px-3 pb-1',
}

export default annotationRadio
