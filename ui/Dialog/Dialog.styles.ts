import { cva } from 'class-variance-authority'

import { typographyStyles } from '../Typography'

const dialog = {
  root: cva(
    'data-[closed]:transform-[scale(95%)] w-full max-w-md bg-neutral-900 duration-300 ease-out data-[closed]:opacity-0',
  ),
  header: {
    root: 'bg-neutral-800 pl-4 pb-2 text-white/60',
    title: {
      root: typographyStyles.root({
        variant: 'label',
        className: 'flex items-center',
      }),
      close: {
        root: 'ml-auto inline-flex h-10 w-10 data-[hover]:bg-white/5',
        icon: 'm-auto size-6',
      },
    },
  },
}

export default dialog
