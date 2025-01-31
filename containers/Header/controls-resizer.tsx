'use client'

import { useCallback } from 'react'

import { annotator } from '@/lib'

import { useCurrentCategory, useStoreDispatch, useStoreState } from '@/hooks'

import { RangeField } from '@/ui'

export default function ControlsResizer() {
  const category = useCurrentCategory()
  const mode = useStoreState((state) => state.annotator.mode)
  const size = useStoreState((state) => state.annotator.size.brush)
  const dispatch = useStoreDispatch()
  const handleSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(annotator.actions.setBrushSize(+event.target.value))
    },
    [dispatch],
  )

  return (
    <RangeField
      label="Brush size"
      value={size}
      onChange={handleSize}
      disabled={mode !== 'annotating' || category?.type !== 'brush'}
    />
  )
}
