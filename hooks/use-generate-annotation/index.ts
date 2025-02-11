import { useEffect } from 'react'

import dataset from '@/reducers/dataset'

import useCanvas from '../use-canvas'
import useCurrentCategory from '../use-current-category'
import useEnhancedId from '../use-enhanced-id'
import useStoreDispatch from '../use-store-dispatch'
import useStoreState from '../use-store-state'
import getAnnotation from './get-annotation'

export default function useGenerateAnnotation() {
  const dispatch = useStoreDispatch()
  const canvas = useCanvas()
  const category = useCurrentCategory()
  const image = useStoreState((state) => state.annotator.current.id.image)
  const mode = useStoreState((state) => state.annotator.mode)
  const [id, nextId] = useEnhancedId()

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    function handleMouseUp() {
      if (!_canvas || !category || mode !== 'annotating') return

      const annotation = getAnnotation(_canvas)

      if (!annotation) return

      dispatch(
        dataset.actions.addAnnotation({
          id,
          image_id: image,
          category_id: category.id,
          iscrowd: category.isCrowd === 'yes' ? 1 : 0,
          ...annotation,
        }),
      )
      dispatch(
        dataset.actions.addCategory({
          supercategory: category.supercategory,
          id: category.id,
          name: category.name,
        }),
      )
      nextId()
    }
    _canvas.on('mouse:up', handleMouseUp)

    return () => {
      _canvas.off('mouse:up', handleMouseUp)
    }
  }, [image, id, dispatch, nextId, category, mode, canvas])
}
