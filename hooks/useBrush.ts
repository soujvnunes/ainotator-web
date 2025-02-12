import { useEffect } from 'react'

import { PencilBrush } from 'fabric'

import useCanvas from './useCanvas'
import useCurrentCategory from './useCurrentCategory'
import useStoreState from './useStoreState'

export default function useBrush() {
  const category = useCurrentCategory()
  const canvas = useCanvas()
  const size = useStoreState((state) => state.annotator.size.brush)
  const mode = useStoreState((state) => state.annotator.mode)

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas || mode !== 'annotating' || category?.type !== 'brush') return

    _canvas.isDrawingMode = true
    _canvas.freeDrawingBrush = new PencilBrush(_canvas)
    _canvas.freeDrawingBrush.color = category.color
    _canvas.freeDrawingBrush.width = size
  }, [canvas, category, mode, size])
}
