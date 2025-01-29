'use client'

import { Fieldset, Legend } from '@headlessui/react'

import annotator from '@/lib/annotator'
import dataset from '@/lib/dataset'
import { licenseFields } from '@/lib/exportForm'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useFormSubmit from '@/hooks/useFormSubmit'
import useNextId from '@/hooks/useNextId'

import { TextField } from '@/ui'

interface ExportLicenseFields {
  name: string
  url: string
}

export default function ExportLicense() {
  const dispatch = useAppDispatch()
  const licenses = useAppState((state) => state.annotator.previous.licenses)
  const [id, nextId] = useNextId()
  const formSubmit = useFormSubmit<ExportLicenseFields>((fields) => {
    const license = { id, ...fields }

    dispatch(annotator.actions.addLicense(license))
    dispatch(dataset.actions.addLicense(license))
    nextId()
    // TODO: next tab
  })

  return (
    <form onSubmit={formSubmit.onSubmit}>
      <Fieldset>
        <Legend className="sr-only">License details.</Legend>
        {licenseFields.map((field) => {
          const license = licenses.find((license) => license.id === 0)

          return (
            <TextField
              className="mt-4"
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              defaultValue={license?.[field.name]}
              invalid={{
                when: formSubmit.fields.empty.includes(field.name),
                message: 'Empty',
              }}
            />
          )
        })}
      </Fieldset>
    </form>
  )
}
