'use client'

import { useCallback } from 'react'

import annotator from '@/reducers/annotator'

import selectCategory from '@/selectors/selectCategory'

import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import RangeField from '@/components/RangeField'

export default function ControlsResizer() {
  const category = useStoreState(selectCategory)
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
