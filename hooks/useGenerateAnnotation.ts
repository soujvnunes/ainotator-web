import { useEffect } from 'react'

import dataset from '@/reducers/dataset'

import generateAnnotation from '@/helpers/getAnnotation'

import useCanvas from './useCanvas'
import useCurrentCategory from './useCurrentCategory'
import useStoreDispatch from './useDispatch'
import useEnhancedId from './useEnhancedId'
import useStoreState from './useStoreState'

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

      // TODO: skip previous generated annotation
      const annotation = generateAnnotation(_canvas)

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
