import { twMerge } from 'tailwind-merge'

import Button, { type ButtonProps } from '../button'
import iconButtonStyles from './styles'

interface IconButtonProps
  extends Omit<ButtonProps, 'aria-label' | 'fullWidth'> {
  'aria-label': string
  /**
   * @default md
   */
  size?: 'lg' | 'md'
}

export default function IconButton({
  className,
  size,
  ...props
}: IconButtonProps) {
  return (
    <Button
      className={twMerge(iconButtonStyles.root({ size, className }))}
      {...props}
    />
  )
}
