'use client'

import { useCallback } from 'react'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

import selectCurrentImage from '@/selectors/selectCurrentImage'

import generateLink from '@/helpers/generateLink'

import useCanvas from '@/hooks/useCanvas'
import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/components/IconButton'

export default function ActionsExport() {
  const canvas = useCanvas()
  const dispatch = useStoreDispatch()
  const info = useStoreState(dataset.selectors.info)
  const annotations = useStoreState(dataset.selectors.annotations)
  const image = useStoreState(selectCurrentImage)
  const handleValidation = useCallback(() => {
    const _canvas = canvas.current

    if (!_canvas || !image) return

    generateLink({
      name: `${image.file_name}_${info.date_created}_annotations.json`,
      value: dataset,
    })
    dispatch(annotator.actions.setMode('waiting'))
    dispatch(annotator.actions.setCategory(0))
    _canvas.clear()
  }, [canvas, dispatch, image, info.date_created])

  return (
    <IconButton
      onClick={handleValidation}
      disabled={!annotations.length}
      aria-label="Export annotations in COCO format">
      <DocumentArrowDownIcon className="m-auto size-6" />
    </IconButton>
  )
}
