import { useEffect } from 'react'

import annotatorSlice from '@/slices/annotatorSlice'

import useAppState from './useAppState'
import useCanvas from './useCanvas'

export default function useUnselectCanvas() {
  const canvas = useCanvas()

  const currentCategoryId = useAppState(annotatorSlice.selectors.currentCategoryId)

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    _canvas.selection = false
    _canvas.forEachObject((obj) => {
      obj.selectable = false
      obj.hasControls = false
    })
    _canvas.renderAll()
  }, [canvas, currentCategoryId])
}
