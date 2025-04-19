'use client'

import { useCallback, useEffect } from 'react'

import { Fieldset, Legend } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

import datasetApi from '@/api/datasetApi'

import selectDataset from '@/selectors/selectDataset'

import generateLink from '@/helpers/generateLink'
import isFetchBaseQueryError from '@/helpers/isFetchBaseQueryError'

import useFormSubmit from '@/hooks/useFormSubmit'
import useStoreState from '@/hooks/useStoreState'

import Button from '@/components/Button'
import TextField from '@/components/TextField'

export default function ActionsExportDownload() {
  const dataset = useStoreState(selectDataset)

  const [validate, validation] = datasetApi.useValidateMutation()

  const handleValidate = useCallback(() => {
    validate(dataset) // Validate on error
  }, [dataset, validate])

  const formSubmit = useFormSubmit<{ name: string }>((fields) => {
    generateLink({ name: `${fields.name}.json`, value: dataset })
  })

  useEffect(() => {
    handleValidate() // Validate (only) on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(validation)

  return (
    <div className="flex flex-col">
      <div className="m-auto px-4">
        {validation.isLoading && 'Validating...'}
        {validation.isError && (
          <div className="space-y-2 text-center">
            <p className="text-lg">
              {isFetchBaseQueryError(validation.error) && validation.error.status === 500
                ? 'Internal server error'
                : 'An Error has occured.'}
            </p>
            <Button
              variant="filled"
              className="gap-3"
              aria-label="Try again"
              onClick={handleValidate}>
              Try again
              <ArrowPathIcon className="size-6" />
            </Button>
          </div>
        )}
        {!!validation.data?.errors?.length && (
          <p className="mb-4">Validation successfull, but encountered minor errors:</p>
        )}
        <ul
          className="mb-2 space-y-2"
          hidden={!validation.data?.errors?.length}>
          {validation.data?.errors?.map((error) => (
            <li key={error.instancePath + error.message}>
              <strong className="inline-flex h-6 items-center rounded-sm bg-white/10 px-2 text-xs tracking-wide text-white/60">
                {error.instancePath}
              </strong>{' '}
              {error.message}
            </li>
          ))}
        </ul>
        {!!validation.data?.errors?.length && (
          <p className="text-sm text-white/60">
            Please, check each field followed by its requirement, and close this dialog to fix them.
          </p>
        )}
      </div>
      <form onSubmit={formSubmit.onSubmit}>
        <Fieldset disabled={validation.isLoading || !validation.data?.isValid}>
          <Legend className="sr-only">Dataset file details</Legend>
          <TextField
            name="name"
            label="Name"
            placeholder="Cat"
            autoComplete="dataset file name"
            defaultValue={dataset.info.date_created}
            invalid={[formSubmit.fields.empty.includes('name'), 'Empty']}
          />
          <Button
            fullWidth
            type="submit">
            Download
          </Button>
        </Fieldset>
      </form>
    </div>
  )
}
