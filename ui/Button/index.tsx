import { Button as HeadlessButton } from '@headlessui/react'

import { twMerge } from '@/helpers'

import buttonStyles from './styles'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  fullWidth?: boolean
  /**
   * @default text
   */
  variant?: 'filled' | 'text'
}

export { buttonStyles }
export default function Button({
  className,
  variant,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      className={twMerge(buttonStyles.root({ variant, fullWidth, className }))}
      {...props}
    />
  )
}
