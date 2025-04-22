import { useEffect } from 'react'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice from '@/slices/datasetSlice'

import useAppDispatch from '../useAppDispatch'
import useAppState from '../useAppState'
import useCanvas from '../useCanvas'
import useEnhancedId from '../useEnhancedId'
import generateAnnotation from './generateAnnotation'

export default function useGenerateAnnotation() {
  const dispatch = useAppDispatch()

  const canvas = useCanvas()

  const currentCategory = useAppState(annotatorSlice.selectors.currentCategory)
  const currentImageId = useAppState(annotatorSlice.selectors.currentImageId)
  const isAnnotating = useAppState(annotatorSlice.selectors.isAnnotating)

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
