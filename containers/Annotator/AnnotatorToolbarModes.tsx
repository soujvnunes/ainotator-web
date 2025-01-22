'use client'

import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { PencilBrush } from 'fabric'
import { useCallback } from 'react'
import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'
import { AnnotatorStateAction, Category } from '@/stores/annotator'
import getDatasetAnnotation from '@/helpers/getDatasetAnnotation'

const annotatorToolbarModes = ['brush', 'polygon'] as const

export default function AnnotatorToolbarModes() {
  const annotatorRefs = useAnnotatorRefs()
  // TODO: use state.annotator.currentCategory != null as it'll be the same thing
  const action = useAnnotatorState((state) => state.annotator.action)
  const dispatch = useAnnotatorDispatch()
  const handleMode = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const canvas = annotatorRefs.canvas.current
      const mode = event.currentTarget.name as Category
      const newAction = (
        action.name === 'annotating' && action.category === mode
          ? { name: 'editting' }
          : { name: 'annotating', category: mode }
      ) as AnnotatorStateAction

      dispatch.annotator.setAction(newAction)
      // TODO: dynamically when click on class
      dispatch.dataset.addCategory({
        id: 0,
        name: 'cat',
        supercategory: 'animal',
      })

      if (!canvas) return

      if (newAction.name !== 'annotating') {
        const datasetAnnotation = getDatasetAnnotation(canvas, {
          isCrowded: false,
          id: {
            image: 0, // TODO: dynamically when image is set
            category: 0, // TODO: dynamically when class is set
            annotation: 0, // TODO: dynamically when mouse is up
          },
        })

        if (datasetAnnotation) dispatch.dataset.addAnnotation(datasetAnnotation)

        canvas.isDrawingMode = false
      } else {
        if (newAction.category === 'brush') {
          canvas.isDrawingMode = true
          canvas.freeDrawingBrush = new PencilBrush(canvas)
          canvas.freeDrawingBrush.color = 'rgba(255,0,0,0.5)'
          canvas.freeDrawingBrush.width = 20
        } else if (newAction.category === 'polygon') {
          // TODO: polygon
        }
      }
    },
    [annotatorRefs, action],
  )

  return (
    <div className="space-x-4">
      {/** TODO: render using state.annotator.categories after adding it */}
      {annotatorToolbarModes.map((annotatorToolbarMode) => (
        <button
          type="button"
          className="disabled:text-white/60"
          key={annotatorToolbarMode}
          name={annotatorToolbarMode}
          onClick={handleMode}
          disabled={
            action.name === 'waiting' ||
            (action.name === 'annotating' &&
              action.category !== annotatorToolbarMode)
          }>
          {annotatorToolbarMode}
        </button>
      ))}
    </div>
  )
}
