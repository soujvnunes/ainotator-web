import { cva } from 'class-variance-authority'

import { twMerge } from '@/helpers'

import { buttonStyles } from '../button'

const tabsStyles = {
  root: cva('flex bg-neutral-800'),
  tab: cva(
    twMerge(
      buttonStyles.root({
        variant: 'text',
        className:
          'border-b-2 border-b-transparent grow hover:border-gray-50 data-selected:border-gray-50/20 hover:data-selected:border-gray-50',
      }),
    ),
  ),
}

export default tabsStyles
