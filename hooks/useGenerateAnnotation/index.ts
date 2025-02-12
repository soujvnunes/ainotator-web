import { useEffect } from 'react'

import dataset from '@/reducers/dataset'

import selectCurrentCategory from '@/selectors/selectCurrentCategory'

import useCanvas from '../useCanvas'
import useStoreDispatch from '../useDispatch'
import useEnhancedId from '../useEnhancedId'
import useStoreState from '../useStoreState'
import generateAnnotation from './generateAnnotation'

export default function useGenerateAnnotation() {
  const dispatch = useStoreDispatch()
  const canvas = useCanvas()
  const currentCategory = useStoreState(selectCurrentCategory)
  const image = useStoreState((state) => state.annotator.current.id.image)
  const mode = useStoreState((state) => state.annotator.mode)
  const [id, nextId] = useEnhancedId()

  useEffect(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    function handleMouseUp() {
      if (!_canvas || !currentCategory || mode !== 'annotating') return

      // TODO: skip previous generated annotation
      const annotation = generateAnnotation(_canvas)

      if (!annotation) return

      dispatch(
        dataset.actions.addAnnotation({
          id,
          image_id: image,
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
  }, [image, id, dispatch, nextId, currentCategory, mode, canvas])
}
