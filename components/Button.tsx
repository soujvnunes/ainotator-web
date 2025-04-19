import { Button as HeadlessButton } from '@headlessui/react'

import twMerge from '@/helpers/twMerge'

import button from '@/styles/button'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  fullWidth?: boolean
  /**
   * @default text
   */
  variant?: 'filled' | 'text'
}

export default function Button({ className, variant, fullWidth, ...props }: ButtonProps) {
  return (
    <HeadlessButton
      className={twMerge(button.root({ variant, fullWidth, className }))}
      {...props}
    />
  )
}
