import { useEffect } from 'react'

import { PencilBrush } from 'fabric'

import useCanvas from '../use-canvas'
import useCurrentCategory from '../use-current-category'
import useStoreState from '../use-store-state'

export default function useBrush() {
  const category = useCurrentCategory()
  const canvas = useCanvas()
  const size = useStoreState((state) => state.annotator.size.brush)
  const mode = useStoreState((state) => state.annotator.mode)

  useEffect(() => {
    const _canva = canvas.current

    if (!_canva || mode !== 'annotating' || category?.type !== 'brush') return

    _canva.isDrawingMode = true
    _canva.freeDrawingBrush = new PencilBrush(_canva)
    _canva.freeDrawingBrush.color = category.color
    _canva.freeDrawingBrush.width = size
  }, [canvas, category, mode, size])
}
