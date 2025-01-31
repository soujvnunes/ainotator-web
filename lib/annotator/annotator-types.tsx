import { PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'

const annotatorTypes = [
  {
    children: <StarIcon className="size-4" />,
    value: 'polygon',
  },
  {
    children: <PaintBrushIcon className="size-4" />,
    value: 'brush',
  },
]

export type AnnotatorTypes = (typeof annotatorTypes)[number]['value']

export default annotatorTypes
