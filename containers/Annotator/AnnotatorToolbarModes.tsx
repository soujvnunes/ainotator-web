'use client'

import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { PencilBrush } from 'fabric'
import { useCallback, useState } from 'react'
import {
  useAnnotatorDispatch,
  useAnnotatorState,
} from '@/providers/AnnotatorProvider'

const annotatorToolbarModes = ['brush', 'polygon'] as const

export type Modes = (typeof annotatorToolbarModes)[number] | null

export default function AnnotatorToolbarModes() {
  const annotatorRefs = useAnnotatorRefs()
  const file = useAnnotatorState((state) => state.annotator.file)
  const dispatch = useAnnotatorDispatch()
  const [mode, setMode] = useState<Modes>(null)
  const handleBrush = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const mode = event.currentTarget.name as Modes

      setMode((prevMode) => {
        const canvas = annotatorRefs.canvas.current
        const newMode = prevMode === mode ? null : mode

        if (canvas != null) {
          canvas.isDrawingMode = !!newMode

          if (newMode === 'brush') {
            canvas.freeDrawingBrush = new PencilBrush(canvas)
            canvas.freeDrawingBrush.color = 'rgba(255,0,0,0.5)'
            canvas.freeDrawingBrush.width = 20
            dispatch.addCategory({
              // TODO: dynamically when click on class
              id: 0,
              // TODO: dynamically when click on class
              name: 'cat',
              // TODO: dynamically when click on class
              supercategory: 'animal',
            })
          }
        }

        return newMode
      })
    },
    [],
  )

  return (
    <div className="space-x-4">
      {annotatorToolbarModes.map((annotatorToolbarMode) => (
        <button
          type="button"
          className="disabled:text-white/60"
          key={annotatorToolbarMode}
          name={annotatorToolbarMode}
          onClick={handleBrush}
          disabled={!file || (!!mode && mode !== annotatorToolbarMode)}>
          {annotatorToolbarMode}
        </button>
      ))}
    </div>
  )
}
