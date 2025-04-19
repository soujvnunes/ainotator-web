import { useEffect } from 'react'

import { PencilBrush } from 'fabric'

import annotatorSlice from '@/slices/annotatorSlice'

import useCanvas from './useCanvas'
import useStoreState from './useStoreState'

export default function useBrush() {
  const canvas = useCanvas()
  const currentCategory = useStoreState(annotatorSlice.selectors.currentCategory)
  const brushWidth = useStoreState(annotatorSlice.selectors.brushWidth)
  const isAnnotating = useStoreState(annotatorSlice.selectors.isAnnotating)

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    _canvas.isDrawingMode = false

    if (!isAnnotating || currentCategory?.type !== 'brush') return

    _canvas.isDrawingMode = true
    _canvas.freeDrawingBrush = new PencilBrush(_canvas)
    _canvas.freeDrawingBrush.color = currentCategory.color
    _canvas.freeDrawingBrush.width = brushWidth
  }, [canvas, currentCategory, isAnnotating, brushWidth])
}
