'use client'

import { useCallback } from 'react'

import annotator from '@/reducers/annotator'

import { useCurrentCategory, useStoreDispatch, useStoreState } from '@/hooks'

import RangeField from '@/ui/RangeField'

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
      max={40}
      min={8}
      onChange={handleSize}
      disabled={mode !== 'annotating' || category?.type !== 'brush'}
    />
  )
}
