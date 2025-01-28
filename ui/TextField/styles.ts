import { cva } from 'class-variance-authority'

import { typographyStyles } from '../Typography'

const textFieldStyles = {
  root: cva('data-[disabled]:opacity-60'),
  label: {
    root: typographyStyles.root({
      variant: 'label',
      className:
        'cursor-pointer px-4 data-[disabled]:cursor-not-allowed mb-2 block',
    }),
    required: 'text-red-400',
  },
  input: cva(
    'border-x-none border-t-none peer block h-10 w-full border-b-2 border-b-transparent bg-neutral-800 px-4 text-sm data-[disabled]:cursor-not-allowed data-[focus]:border-b-2 data-[focus]:border-gray-50/20 data-[focus]:outline-none data-[invalid]:outline-dashed data-[invalid]:outline-2 data-[invalid]:outline-offset-2 data-[invalid]:outline-red-400',
  ),
  invalid: {
    message: cva(
      'text-caption text-red-400 peer-data-[invalid]:mt-2 peer-data-[invalid]:px-4',
    ),
  },
}

export default textFieldStyles
