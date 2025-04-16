'use client'

import { useCallback } from 'react'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import datasetSlice from '@/slices/datasetSlice'

import selectCurrentImage from '@/selectors/selectCurrentImage'

import generateLink from '@/helpers/generateLink'

import useCanvas from '@/hooks/useCanvas'
import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/components/IconButton'

export default function ActionsExport() {
  const canvas = useCanvas()
  const info = useStoreState(datasetSlice.selectors.info)
  const annotations = useStoreState(datasetSlice.selectors.annotations)
  const image = useStoreState(selectCurrentImage)
  const handleValidation = useCallback(() => {
    const _canvas = canvas.current

    if (!_canvas || !image) return

    generateLink({
      name: `${image.file_name}_${info.date_created}_annotations.json`,
      value: { info, annotations },
    })
    _canvas.clear()
  }, [annotations, canvas, image, info])

  return (
    <IconButton
      onClick={handleValidation}
      disabled={!annotations.length}
      aria-label="Export annotations in COCO format">
      <DocumentArrowDownIcon className="m-auto size-6" />
    </IconButton>
  )
}
