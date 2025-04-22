'use client'

import { useCallback } from 'react'

import annotatorSlice from '@/slices/annotatorSlice'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'

import RangeField from '@/components/RangeField'

export default function ControlsResizer() {
  const currentCategory = useAppState(annotatorSlice.selectors.currentCategory)
  const brushWidth = useAppState(annotatorSlice.selectors.brushWidth)

  const dispatch = useAppDispatch()

  const handleSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(annotatorSlice.actions.setBrushSize(+event.target.value))
    },
    [dispatch],
  )

  return (
    <RangeField
      label="Brush size"
      value={brushWidth}
      max={40}
      min={8}
      onChange={handleSize}
      disabled={!currentCategory || currentCategory.type !== 'brush'}
    />
  )
}
