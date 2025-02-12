import { PaintBrushIcon, StarIcon } from '@heroicons/react/24/solid'

import annotatorTypes from '@/consts/annotatorTypes'

export default annotatorTypes.map((value) => {
  const Icon = value === 'polygon' ? StarIcon : PaintBrushIcon

  return { children: <Icon className="size-4" />, value }
})
