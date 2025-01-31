import { useEffect } from 'react'

import { PencilBrush } from 'fabric'

import useCurrentCategory from '../use-current-category'
import useRefs from '../use-refs'
import useStoreState from '../use-store-state'

export default function useBrush() {
  const category = useCurrentCategory()
  const refs = useRefs()
  const size = useStoreState((state) => state.annotator.size.brush)
  const mode = useStoreState((state) => state.annotator.mode)

  useEffect(() => {
    const canvas = refs.canvas.current

    if (!canvas || mode !== 'annotating' || category?.type !== 'brush') return

    canvas.isDrawingMode = true
    canvas.freeDrawingBrush = new PencilBrush(canvas)
    canvas.freeDrawingBrush.color = category.color
    canvas.freeDrawingBrush.width = size
  }, [category, mode, refs.canvas, size])
}
