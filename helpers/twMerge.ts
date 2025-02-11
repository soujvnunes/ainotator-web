import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  override: {
    classGroups: {
      'font-size': ['text-label', 'text-caption'],
    },
  },
})

export default twMerge
