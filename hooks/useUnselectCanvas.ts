import { useEffect } from 'react'

import annotator from '@/reducers/annotator'

import useCanvas from './useCanvas'
import useStoreState from './useStoreState'

export default function useUnselectCanvas() {
  const canvas = useCanvas()
  const categoryId = useStoreState(annotator.selectors.currentCategoryId)

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    _canvas.selection = false
    _canvas.forEachObject((obj) => {
      obj.selectable = false
      obj.hasControls = false
    })
    _canvas.renderAll()
  }, [canvas, categoryId])
}
