import twMerge from '@/helpers/twMerge'

import iconButton from '@/styles/iconButton'

import Button, { type ButtonProps } from './Button'

interface IconButtonProps extends Omit<ButtonProps, 'aria-label' | 'fullWidth'> {
  'aria-label': string
  /**
   * @default md
   */
  size?: 'lg' | 'md'
}

export default function IconButton({ className, size, ...props }: IconButtonProps) {
  return (
    <Button
      className={twMerge(iconButton.root({ size, className }))}
      {...props}
    />
  )
}
