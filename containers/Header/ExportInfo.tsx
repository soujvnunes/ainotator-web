'use client'

import { useState, useTransition } from 'react'

import validateDataset, {
  type ValidateDataset,
} from '@/actions/validateDataset'
import { Fieldset, Legend, useClose } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'

import annotator from '@/lib/annotator'
import { infoFields } from '@/lib/exportForm'
import generateLink from '@/lib/generateLink'
import isValidationSuccessful from '@/lib/isValidationSuccessful'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'
import useFormSubmit from '@/hooks/useFormSubmit'

import { Button, TextField } from '@/ui'

interface ExportInfoFields {
  description: string
  url: string
  version: string
  year: string
  contributor: string
  date_created: string
}

export default function ExportInfo() {
  const dispatch = useAppDispatch()
  const info = useAppState((state) => state.annotator.previous.info)
  const images = useAppState((state) => state.dataset.images)
  const categories = useAppState((state) => state.dataset.categories)
  const licenses = useAppState((state) => state.annotator.previous.licenses)
  const annotations = useAppState((state) => state.dataset.annotations)
  const [validation, setValidation] = useState<ValidateDataset | null>(null)
  const [isPending, startTransition] = useTransition()
  const closeExport = useClose()
  const annotatorRef = useCanvasRefs()
  const formSubmit = useFormSubmit<ExportInfoFields>((fields) => {
    const newInfo = { ...fields, year: +fields.year }

    startTransition(async () => {
      const newDataset = {
        images,
        categories,
        annotations,
        licenses: [licenses[0]],
        info: newInfo,
      }
      const validation = await validateDataset(newDataset)

      startTransition(async () => {
        if (isValidationSuccessful(validation)) {
          return setValidation(validation)
        }

        setValidation(null)
        generateLink({
          name: `${images[0].file_name}_${fields.date_created}_annotations.json`,
          value: newDataset,
        })
        dispatch(annotator.actions.setInfo(newInfo))
        dispatch(annotator.actions.setMode('waiting'))
        dispatch(annotator.actions.setCategory({ id: 0 }))
        // CLEAR REFS
        annotatorRef.file.current = null
        annotatorRef.image.current = null
        annotatorRef.canvas.current?.clear()
        // CLOSE DIALOG
        closeExport()
      })
    })
  })

  return (
    <form onSubmit={formSubmit.onSubmit}>
      <Fieldset>
        <Legend className="sr-only">Information details.</Legend>
        {infoFields.map((field) => {
          const type = ['year', 'date_created'].includes(field.name)
            ? 'date'
            : 'text'

          return (
            <TextField
              className="mt-4"
              type={type}
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              defaultValue={info?.[field.name]}
              invalid={{
                when: formSubmit.fields.empty.includes(field.name),
                message: 'Empty',
              }}
            />
          )
        })}
        <div className="flex items-center">
          <Button
            fullWidth
            type="submit"
            className={
              isValidationSuccessful(validation)
                ? 'pointer-events-none text-green-400'
                : ''
            }>
            {isValidationSuccessful(validation) ? (
              <>
                <CheckIcon className="mr-2 size-6" />
                Valid
              </>
            ) : (
              `Valid${isPending ? 'ating...' : 'ate'}`
            )}
          </Button>
        </div>
      </Fieldset>
    </form>
  )
}
