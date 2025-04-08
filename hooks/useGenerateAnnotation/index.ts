import { useEffect } from 'react'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

import useCanvas from '../useCanvas'
import useStoreDispatch from '../useDispatch'
import useEnhancedId from '../useEnhancedId'
import useStoreState from '../useStoreState'
import generateAnnotation from './generateAnnotation'

export default function useGenerateAnnotation() {
  const dispatch = useStoreDispatch()
  const canvas = useCanvas()
  const currentCategory = useStoreState(annotator.selectors.currentCategory)
  const currentImageId = useStoreState(annotator.selectors.currentImageId)
  const isAnnotating = useStoreState(annotator.selectors.isAnnotating)
  const [id, nextId] = useEnhancedId()

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    function handleMouseUp() {
      if (!_canvas || !currentCategory || !isAnnotating) return

      // TODO: skip previous generated annotation
      const annotation = generateAnnotation(_canvas)

      if (!annotation) return

      dispatch(
        dataset.actions.addAnnotation({
          id,
          image_id: currentImageId,
          category_id: currentCategory.id,
          iscrowd: currentCategory.isCrowd === 'yes' ? 1 : 0,
          ...annotation,
        }),
      )
      dispatch(dataset.actions.addCategory(currentCategory))
      nextId()
    }
    _canvas.on('mouse:up', handleMouseUp)

    return () => {
      _canvas.off('mouse:up', handleMouseUp)
    }
  }, [
    currentImageId,
    id,
    dispatch,
    nextId,
    currentCategory,
    canvas,
    isAnnotating,
  ])
}
