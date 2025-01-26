import { twMerge } from 'tailwind-merge'

import Button, { type ButtonProps } from '../Button'
import iconButtonStyles from './styles'

interface IconButtonProps
  extends Omit<ButtonProps, 'aria-label' | 'fullWidth'> {
  'aria-label': string
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
