import { useEffect } from 'react'

import { PencilBrush } from 'fabric'

import selectBrushWidth from '@/selectors/selectBrushWidth'
import selectCurrentCategory from '@/selectors/selectCurrentCategory'
import selectIsAnnotating from '@/selectors/selectIsAnnoting'

import useCanvas from './useCanvas'
import useStoreState from './useStoreState'

export default function useBrush() {
  const canvas = useCanvas()
  const category = useStoreState(selectCurrentCategory)
  const brushWidth = useStoreState(selectBrushWidth)
  const isAnnotating = useStoreState(selectIsAnnotating)

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    _canvas.isDrawingMode = false

    if (!isAnnotating || category?.type !== 'brush') return

    _canvas.isDrawingMode = true
    _canvas.freeDrawingBrush = new PencilBrush(_canvas)
    _canvas.freeDrawingBrush.color = category.color
    _canvas.freeDrawingBrush.width = brushWidth
  }, [canvas, category, isAnnotating, brushWidth])
}
