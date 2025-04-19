'use client'

import { useCallback, useEffect } from 'react'

import datasetApi from '@/api/datasetApi'

import selectDataset from '@/selectors/selectDataset'

import generateLink from '@/helpers/generateLink'

import useCanvas from '@/hooks/useCanvas'
import useStoreState from '@/hooks/useStoreState'

import Button from '@/components/Button'

export default function ActionsExportDownload() {
  const canvas = useCanvas()

  const dataset = useStoreState(selectDataset)

  const [validate, validation] = datasetApi.useValidateMutation()

  const handleDownload = useCallback(() => {
    canvas.current?.clear()
    generateLink({
      name: `${dataset.info.date_created}_annotations.json`,
      value: dataset,
    })
  }, [canvas, dataset])

  useEffect(() => {
    validate(dataset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(validation)

  return (
    // TODO: enhance UI
    <>
      {validation.isLoading && 'Validating...'}
      {/** TODO: format */}
      {validation.data?.errors?.map((error) => (
        <p key={error.message}>
          {error.instancePath} {error.message}
        </p>
      ))}
      <Button
        type="submit"
        disabled={validation.isLoading || !validation.data?.isValid}
        onClick={handleDownload}
        fullWidth>
        Download
      </Button>
    </>
  )
}
