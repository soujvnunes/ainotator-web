import { PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'

import annotatorTypes, { type AnnotatorTypes } from '@/lib/annotatorTypes'

export default annotatorTypes.reduce(
  (fields, value) => {
    const children =
      value === 'polygon' ? (
        <StarIcon className="size-4" />
      ) : (
        <PaintBrushIcon className="size-4" />
      )

    return [...fields, { children, value }]
  },
  [] as { children: React.JSX.Element; value: AnnotatorTypes }[],
)
