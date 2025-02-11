import { cva } from 'class-variance-authority'

import twMerge from '@/helpers/twMerge'

import button from './button'

const tabs = {
  root: cva('flex bg-neutral-800'),
  tab: cva(
    twMerge(
      button.root({
        variant: 'text',
        className:
          'grow border-b-2 border-b-transparent hover:border-gray-50 data-selected:border-gray-50/20 hover:data-selected:border-gray-50',
      }),
    ),
  ),
}

export default tabs
