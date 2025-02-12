'use client'

import { useCallback } from 'react'

import annotator from '@/reducers/annotator'

import selectCurrentCategory from '@/selectors/selectCurrentCategory'

import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import RangeField from '@/components/RangeField'

export default function ControlsResizer() {
  const currentCategory = useStoreState(selectCurrentCategory)
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
      disabled={mode !== 'annotating' || currentCategory?.type !== 'brush'}
    />
  )
}
