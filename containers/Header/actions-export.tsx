'use client'

import { useCallback, useTransition } from 'react'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import { validateDataset } from '@/actions'

import annotator from '@/reducers/annotator'

import { generateLink, isDatasetValid } from '@/helpers'

import { useCanvas, useStoreDispatch, useStoreState } from '@/hooks'

import IconButton from '@/ui/IconButton'

export default function ActionsExport() {
  const canvas = useCanvas()
  const dispatch = useStoreDispatch()
  const dataset = useStoreState((state) => state.dataset)
  const image = useStoreState((state) => state.annotator.current.id.image)
  const [isPending, startTransition] = useTransition()
  const handleValidation = useCallback(() => {
    const _canvas = canvas.current

    if (!_canvas) return

    dispatch(annotator.actions.setMode('exporting'))

    startTransition(async () => {
      const validation = await validateDataset(dataset)

      startTransition(() => {
        // TODO: show a toast with error fields with @/lib/formatValidation
        if (!isDatasetValid(validation)) return

        const currentImage = dataset.images.find(({ id }) => id === image)

        // TODO: show a toast with error: image details not provided
        if (!currentImage) return

        generateLink({
          name: `${currentImage.file_name}_${dataset.info.date_created}_annotations.json`,
          value: dataset,
        })
        // RESET ANNOTATOR STATE
        dispatch(annotator.actions.setMode('waiting'))
        dispatch(annotator.actions.setCategory(0))
        _canvas.clear()
      })
    })
  }, [canvas, dataset, dispatch, image])

  return (
    <IconButton
      onClick={handleValidation}
      disabled={isPending || !dataset.annotations.length}
      aria-label="Export annotations in COCO format">
      <DocumentArrowDownIcon className="m-auto size-6" />
    </IconButton>
  )
}
