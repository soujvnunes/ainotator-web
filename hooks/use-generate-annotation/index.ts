import { useEffect } from 'react'

import { dataset } from '@/lib'

import useCurrentCategory from '../use-current-category'
import useEnhancedId from '../use-enhanced-id'
import useRefs from '../use-refs'
import useStoreDispatch from '../use-store-dispatch'
import useStoreState from '../use-store-state'
import getAnnotation from './get-annotation'

export default function useGenerateAnnotation() {
  const dispatch = useStoreDispatch()
  const refs = useRefs()
  const category = useCurrentCategory()
  const image = useStoreState((state) => state.annotator.current.id.image)
  const mode = useStoreState((state) => state.annotator.mode)
  const [id, nextId] = useEnhancedId()

  useEffect(() => {
    const canvas = refs.canvas.current

    if (!canvas) return

    function handleMouseUp() {
      if (!canvas || !category || mode !== 'annotating') {
        return
      }

      const datasetAnnotation = getAnnotation(canvas, {
        isCrowd: category.isCrowd,
        id: { image, category: category.id, annotation: id },
      })

      if (!datasetAnnotation) return

      dispatch(dataset.actions.addAnnotation(datasetAnnotation))
      dispatch(
        dataset.actions.addCategory({
          supercategory: category.supercategory,
          id: category.id,
          name: category.name,
        }),
      )
      nextId()
    }

    canvas.on('mouse:up', handleMouseUp)

    return () => {
      canvas.off('mouse:up', handleMouseUp)
    }
  }, [refs, image, id, dispatch, nextId, category, mode])
}
