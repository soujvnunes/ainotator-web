import { cva } from 'class-variance-authority'

import { buttonStyles } from '../button'

const radioFieldStyles = {
  root: cva('group flex'),
  radio: buttonStyles.root({
    variant: 'text',
    fullWidth: true,
    className:
      'data-[checked]:data-[hover]:bg-white/60 data-[checked]:data-[disabled]:bg-white/40 data-[checked]:bg-white shrink data-[checked]:text-black data-[checked]:data-[disabled]:text-black/60',
  }),
}

export default radioFieldStyles
