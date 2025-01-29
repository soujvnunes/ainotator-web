import { cva } from 'class-variance-authority'

const rangeFieldStyles = {
  root: cva(
    'group relative mx-5 inline-flex h-10 w-40 items-center justify-center',
  ),
  label: 'sr-only',
  input: cva(
    'w-full cursor-pointer opacity-0 group-data-[disabled]:cursor-not-allowed',
  ),
  resizer: {
    root: cva('absolute inset-0 -z-10'),
    track: cva('absolute top-4 h-2 w-full bg-neutral-800'),
    thumb: cva(
      'absolute left-[--left] top-[--top] h-[--size] w-[--size] bg-white group-data-[disabled]:bg-neutral-600',
    ),
  },
}

export default rangeFieldStyles
