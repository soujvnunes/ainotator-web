import { useEffect } from 'react'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice from '@/slices/datasetSlice'

import useCanvas from '../useCanvas'
import useStoreDispatch from '../useDispatch'
import useEnhancedId from '../useEnhancedId'
import useStoreState from '../useStoreState'
import generateAnnotation from './generateAnnotation'

export default function useGenerateAnnotation() {
  const dispatch = useStoreDispatch()
  const canvas = useCanvas()
  const currentCategory = useStoreState(annotatorSlice.selectors.currentCategory)
  const currentImageId = useStoreState(annotatorSlice.selectors.currentImageId)
  const isAnnotating = useStoreState(annotatorSlice.selectors.isAnnotating)
  const [id, nextId] = useEnhancedId()

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    function handleMouseUp() {
      if (!_canvas || !currentCategory || !isAnnotating) return

      // TODO: skip previous generated annotation
      const canvasAnnotation = generateAnnotation(_canvas)

      if (!canvasAnnotation) return

      dispatch(
        datasetSlice.actions.addAnnotation({
          id,
          image_id: currentImageId,
          category_id: currentCategory.id,
          iscrowd: currentCategory.isCrowd === 'yes' ? 1 : 0,
          ...canvasAnnotation,
        }),
      )
      dispatch(datasetSlice.actions.addCategory(currentCategory))
      nextId()
    }
    _canvas.on('mouse:up', handleMouseUp)

    return () => {
      _canvas.off('mouse:up', handleMouseUp)
    }
  }, [currentImageId, id, dispatch, nextId, currentCategory, canvas, isAnnotating])
}
