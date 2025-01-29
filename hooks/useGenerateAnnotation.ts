import { useEffect } from 'react'

import dataset from '@/lib/dataset'
import getDatasetAnnotation from '@/lib/getDatasetAnnotation'

import useAppDispatch from './useAppDispatch'
import useAppState from './useAppState'
import useCanvasRefs from './useCanvasRefs'
import useCurrentCategory from './useCurrentCategory'
import useNextId from './useNextId'

export default function useGenerateAnnotation() {
  const dispatch = useAppDispatch()
  const annotatorRefs = useCanvasRefs()
  const category = useCurrentCategory()
  const images = useAppState((state) => state.dataset.images)
  const mode = useAppState((state) => state.annotator.current.mode)
  const [id, nextId] = useNextId()

  useEffect(() => {
    const canvas = annotatorRefs.canvas.current

    function handleMouseUp() {
      if (canvas == null || category == undefined || mode !== 'annotating') {
        return
      }

      const datasetAnnotation = getDatasetAnnotation(canvas, {
        isCrowd: category.isCrowd,
        id: { image: images[0].id, category: category.id, annotation: id },
      })

      if (datasetAnnotation == undefined) return

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

    if (canvas == null) return

    canvas.on('mouse:up', handleMouseUp)

    return () => {
      canvas.off('mouse:up', handleMouseUp)
    }
  }, [annotatorRefs, images, id, dispatch, nextId, category, mode])
}
