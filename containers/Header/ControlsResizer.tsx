'use client'

import { useCallback } from 'react'

import annotator from '@/lib/annotator'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'

import { FieldRange } from '@/ui'

export default function ControlsResizer() {
  const mode = useAppState((state) => state.annotator.current.mode)
  const category = useAppState((state) => state.annotator.current.category)
  const size = useAppState((state) => state.annotator.current.size.brush)
  const dispatch = useAppDispatch()
  const handleSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(annotator.actions.setSize({ brush: +event.target.value }))
    },
    [dispatch],
  )

  return (
    <FieldRange
      label="Brush size"
      value={size}
      onChange={handleSize}
      disabled={mode !== 'annotating' || category?.type !== 'brush'}
    />
  )
}
