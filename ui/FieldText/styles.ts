import { cva } from 'class-variance-authority'

import typographyStyles from '../Typography/styles'

const fieldTextStyles = {
  root: cva('data-[disabled]:opacity-60'),
  label: typographyStyles.root({
    variant: 'label',
    className: 'cursor-pointer px-4 data-[disabled]:cursor-not-allowed',
  }),
  input:
    'border-x-none border-t-none peer mt-2 block h-10 w-full border-b-2 border-b-transparent bg-neutral-800 px-4 text-sm data-[focus]:outline-none data-[disabled]:cursor-not-allowed data-[focus]:border-b-2 data-[focus]:border-gray-50/20 data-[invalid]:outline-dashed data-[invalid]:outline-2 data-[invalid]:outline-offset-2 data-[invalid]:outline-red-400',
  invalid: {
    message: typographyStyles.root({
      variant: 'caption',
      className:
        'text-red-400 peer-data-[invalid]:mt-2 peer-data-[invalid]:px-4',
    }),
  },
}

export default fieldTextStyles
