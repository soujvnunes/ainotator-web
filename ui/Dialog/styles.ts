import { cva } from 'class-variance-authority'

const dialogStyles = {
  root: cva(
    'data-closed:transform-[scale(95%)] w-full max-w-md bg-neutral-900 duration-300 ease-out data-closed:opacity-0',
  ),
  header: {
    root: 'bg-neutral-800 pb-2 text-white/60',
    title: {
      root: 'flex items-center',
      text: 'text-label pl-4',
      close: {
        root: 'ml-auto',
        icon: 'size-6',
      },
    },
    description: 'mt-1 px-4 font-normal',
  },
}

export default dialogStyles
