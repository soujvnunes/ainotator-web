'use client'

import { useAnnotatorRefs } from '@/providers/AnnotatorRefsProvider'
import { PencilBrush } from 'fabric'
import { useCallback, useState } from 'react'
import annotatorToolbarModes, { type Modes } from './annotatorToolbarModes'
import Link from 'next/link'
import { useAnnotatorState } from '@/providers/AnnotatorProvider'

export default function AnnotatorToolbar() {
  const annotatorRefs = useAnnotatorRefs()
  const file = useAnnotatorState((state) => state.annotator.file)
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
          }
        }

        return newMode
      })
    },
    [],
  )

  return (
    <div className="flex items-center h-16 px-4">
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
      <Link
        className="ml-auto data-[disabled]:text-white/60 data-[disabled]:pointer-events-none"
        href=""
        data-disabled>
        export
      </Link>
    </div>
  )
}
