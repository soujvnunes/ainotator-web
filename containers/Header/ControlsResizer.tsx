'use client'

import { useCallback } from 'react'

import annotator from '@/lib/annotator'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCurrentCategory from '@/hooks/useCurrentCategory'

import { RangeField } from '@/ui'

export default function ControlsResizer() {
  const category = useCurrentCategory()
  const mode = useAppState((state) => state.annotator.current.mode)
  const size = useAppState((state) => state.annotator.current.size.brush)
  const dispatch = useAppDispatch()
  const handleSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(annotator.actions.setSize({ brush: +event.target.value }))
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
