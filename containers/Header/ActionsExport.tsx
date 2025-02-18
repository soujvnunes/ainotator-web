'use client'

import { useCallback } from 'react'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import annotator from '@/reducers/annotator'

import selectDataset from '@/selectors/selectDataset'

import generateLink from '@/helpers/generateLink'

import useCanvas from '@/hooks/useCanvas'
import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/components/IconButton'

export default function ActionsExport() {
  const canvas = useCanvas()
  const dispatch = useStoreDispatch()
  const dataset = useStoreState(selectDataset)
  const handleValidation = useCallback(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    generateLink({
      name: `${dataset.images[0].file_name}_${dataset.info.date_created}_annotations.json`,
      value: dataset,
    })
    dispatch(annotator.actions.setMode('waiting'))
    dispatch(annotator.actions.setCategory(0))
    _canvas.clear()
  }, [canvas, dataset, dispatch])

  return (
    <IconButton
      onClick={handleValidation}
      disabled={!dataset.annotations.length}
      aria-label="Export annotations in COCO format">
      <DocumentArrowDownIcon className="m-auto size-6" />
    </IconButton>
  )
}
