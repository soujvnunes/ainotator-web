'use client'

import { useCallback, useTransition } from 'react'

import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import validateDataset from '@/actions/validateDataset'

import annotator from '@/reducers/annotator'

import generateLink from '@/helpers/generateLink'
import isDatasetValid from '@/helpers/isDatasetValid'

import useCanvas from '@/hooks/useCanvas'
import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import IconButton from '@/components/IconButton'

export default function ActionsExport() {
  const canvas = useCanvas()
  const dispatch = useStoreDispatch()
  const dataset = useStoreState((state) => state.dataset)
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

        // TODO: ask for the dataset name in a route /export
        const DATASET_NAME = 'dataset_name'

        generateLink({
          name: `${DATASET_NAME}_${dataset.info.date_created}_annotations.json`,
          value: dataset,
        })
        // RESET ANNOTATOR STATE
        dispatch(annotator.actions.setMode('waiting'))
        dispatch(annotator.actions.setCategory(0))
        _canvas.clear()
      })
    })
  }, [canvas, dataset, dispatch])

  return (
    <IconButton
      onClick={handleValidation}
      disabled={isPending || !dataset.annotations.length}
      aria-label="Export annotations in COCO format">
      <DocumentArrowDownIcon className="m-auto size-6" />
    </IconButton>
  )
}
