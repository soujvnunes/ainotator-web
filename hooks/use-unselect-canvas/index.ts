import { useEffect } from 'react'

import useRefs from '../use-refs'
import useStoreState from '../use-store-state'

export default function useUnselectCanvas() {
  const refs = useRefs()
  const category = useStoreState((state) => state.annotator.current.id.category)

  useEffect(() => {
    const canvas = refs.canvas.current

    if (!canvas) return

    canvas.isDrawingMode = false
    canvas.selection = false
    canvas.forEachObject((obj) => {
      obj.selectable = false
      obj.hasControls = false
    })
    canvas.renderAll()
  }, [refs, category])
}
