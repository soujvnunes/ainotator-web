import { useEffect } from 'react'

import useCanvas from '../use-canvas'
import useStoreState from '../use-store-state'

export default function useUnselectCanvas() {
  const canvas = useCanvas()
  const category = useStoreState((state) => state.annotator.current.id.category)

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    _canvas.isDrawingMode = false
    _canvas.selection = false
    _canvas.forEachObject((obj) => {
      obj.selectable = false
      obj.hasControls = false
    })
    _canvas.renderAll()
  }, [category, canvas])
}
