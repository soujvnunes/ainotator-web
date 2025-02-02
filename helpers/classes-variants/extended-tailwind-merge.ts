import { extendTailwindMerge } from 'tailwind-merge'

export default extendTailwindMerge({
  override: {
    classGroups: {
      'font-size': ['text-label', 'text-caption'],
    },
  },
})
