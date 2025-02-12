import { useEffect } from 'react'

import { PencilBrush } from 'fabric'

import selectCurrentCategory from '@/selectors/selectCurrentCategory'

import useCanvas from './useCanvas'
import useStoreState from './useStoreState'

export default function useBrush() {
  const canvas = useCanvas()
  const category = useStoreState(selectCurrentCategory)
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
