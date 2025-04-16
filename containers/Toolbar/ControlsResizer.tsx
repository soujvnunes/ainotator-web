'use client'

import { useCallback } from 'react'

import annotatorSlice from '@/slices/annotatorSlice'

import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import RangeField from '@/components/RangeField'

export default function ControlsResizer() {
  const currentCategory = useStoreState(annotatorSlice.selectors.currentCategory)
  const brushWidth = useStoreState(annotatorSlice.selectors.brushWidth)
  const dispatch = useStoreDispatch()
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
      disabled={!(currentCategory?.type === 'brush')}
    />
  )
}
