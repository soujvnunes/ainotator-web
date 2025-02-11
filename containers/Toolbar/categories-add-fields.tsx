import { UserGroupIcon, UserIcon } from '@heroicons/react/24/solid'
import { PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'

import annotatorColors, { type AnnotatorColors } from '@/lib/annotatorColors'
import annotatorCrowds, { type AnnotatorCrowds } from '@/lib/annotatorCrowds'
import annotatorTypes, { type AnnotatorTypes } from '@/lib/annotatorTypes'

export const categoriesAddCrowds = annotatorCrowds.reduce(
  (fields, value) => {
    const children =
      value === 'yes' ? (
        <UserGroupIcon className="size-4" />
      ) : (
        <UserIcon className="size-4" />
      )

    return [...fields, { children, value }]
  },
  [] as { children: React.JSX.Element; value: AnnotatorCrowds }[],
)
export const categoriesAddType = annotatorTypes.reduce(
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
export const categoriesAddColors = Object.keys(
  annotatorColors.rgb,
) as AnnotatorColors[]
