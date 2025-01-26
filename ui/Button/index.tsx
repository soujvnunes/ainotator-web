import { Button as HeadlessButton } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

import buttonStyles from './styles'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  fullWidth?: boolean
  /**
   * @default text
   */
  variant?: 'filled' | 'text'
  /**
   * @default md
   */
  size?: 'lg' | 'md'
}

export default function Button({
  className,
  variant,
  size,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      className={twMerge(
        buttonStyles.root({
          variant,
          size,
          fullWidth,
          className,
        }),
      )}
      {...props}
    />
  )
}
