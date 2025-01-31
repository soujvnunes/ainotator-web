'use client'

import { useCallback, useTransition } from 'react'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import { annotator, isValidationSuccessful, validateDataset } from '@/lib'

import { generateLink } from '@/helpers'

import { useRefs, useStoreDispatch, useStoreState } from '@/hooks'

import { IconButton } from '@/ui'

export default function ActionsExport() {
  const refs = useRefs()
  const dispatch = useStoreDispatch()
  const dataset = useStoreState((state) => state.dataset)
  const image = useStoreState((state) => state.annotator.current.id.image)
  const [isPending, startTransition] = useTransition()
  const handleValidation = useCallback(() => {
    dispatch(annotator.actions.setMode('exporting'))

    startTransition(async () => {
      const validation = await validateDataset(dataset)

      startTransition(() => {
        // TODO: show a toast with error fields with @/lib/formatValidation
        if (!isValidationSuccessful(validation)) return

        const currentImage = dataset.images.find(({ id }) => id === image)

        // TODO: show a toast with error: image details not provided
        if (!currentImage) return

        generateLink({
          name: `${currentImage.file_name}_${dataset.info.date_created}_annotations.json`,
          value: dataset,
        })
        // CLEAN DATASET?
        // RESET ANNOTATOR STATE
        dispatch(annotator.actions.setMode('waiting'))
        dispatch(annotator.actions.setCategory(0))
        // CLEAN REFS
        refs.file.current = null
        refs.image.current = null
        refs.canvas.current?.clear()
      })
    })
  }, [dataset, dispatch, image, refs.canvas, refs.file, refs.image])

  return (
    <IconButton
      onClick={handleValidation}
      disabled={isPending || !dataset.annotations.length}
      aria-label="Export annotations in COCO format">
      <DocumentArrowDownIcon className="m-auto size-6" />
    </IconButton>
  )
}
