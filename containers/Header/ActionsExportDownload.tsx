'use client'

import { useCallback, useEffect } from 'react'

import { Fieldset, Legend } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

import annotatorApi from '@/api/annotatorApi'

import generateLink from '@/helpers/generateLink'

import useDatasetState from '@/hooks/useDatasetState'
import useFormSubmit from '@/hooks/useFormSubmit'

import Button from '@/components/Button'
import TextField from '@/components/TextField'

interface ActionsExportDownloadFields {
  name: string
}

export default function ActionsExportDownload() {
  const dataset = useDatasetState()

  const [validate, validation] = annotatorApi.useValidateMutation()

  const handleValidate = useCallback(() => {
    validate(dataset)
  }, [dataset, validate])

  const formSubmit = useFormSubmit<ActionsExportDownloadFields>((fields) => {
    generateLink({ name: `${fields.name}.json`, value: dataset })
  })

  useEffect(() => {
    handleValidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col">
      <div className="m-auto p-4">
        <p
          className="mb-2"
          aria-live="polite"
          aria-atomic="true">
          {validation.isError
            ? 'Internal server error.'
            : validation.isLoading
              ? 'Validating...'
              : validation.data?.isValid
                ? 'Valid! Proceed to give the dataset file a name.'
                : 'Invalid! Fix each field value based on its requirement:'}
        </p>
        {validation.isError && (
          <div className="space-y-2 text-center">
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
        <ul
          className="space-y-2"
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
