'use client'

import { useCallback } from 'react'

import annotator from '@/reducers/annotator'

import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import RangeField from '@/components/RangeField'

export default function ControlsResizer() {
  const currentCategory = useStoreState(annotator.selectors.currentCategory)
  const brushWidth = useStoreState(annotator.selectors.brushWidth)
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
      value={brushWidth}
      max={40}
      min={8}
      onChange={handleSize}
      disabled={!currentCategory || currentCategory.type !== 'brush'}
    />
  )
}
