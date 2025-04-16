'use client'

import { Fieldset, Legend, useClose } from '@headlessui/react'

import datasetSlice from '@/slices/datasetSlice'

import useStoreDispatch from '@/hooks/useDispatch'
import useFormSubmit from '@/hooks/useFormSubmit'
import useStoreState from '@/hooks/useStoreState'

import Button from '@/components/Button'
import TextField from '@/components/TextField'

interface ActionsAddInfoFields {
  description: string
  url: string
  version: string
  year: number
  contributor: string
  date_created: string
}

export default function ActionsAddInfoForm() {
  const closeActionAddInfo = useClose()
  const dispatch = useStoreDispatch()
  const info = useStoreState(datasetSlice.selectors.info)
  const formSubmit = useFormSubmit<ActionsAddInfoFields>((fields) => {
    dispatch(datasetSlice.actions.setInfo(fields))
    closeActionAddInfo()
  })

  return (
    <form onSubmit={formSubmit.onSubmit}>
      <Fieldset>
        <Legend className="sr-only">Information details.</Legend>
        {actionsAddInfoFields.map((field) => (
          <TextField
            className="mt-4"
            key={field.name}
            defaultValue={info[field.name] || undefined}
            invalid={[formSubmit.fields.empty.includes(field.name), 'Empty']}
            {...field}
          />
        ))}
        <Button
          type="submit"
          fullWidth>
          Add
        </Button>
      </Fieldset>
    </form>
  )
}

const actionsAddInfoFields = [
  {
    label: 'Description',
    name: 'description',
    placeholder: 'COCO 2017 Dataset',
    type: 'text',
  },
  {
    label: 'URL',
    name: 'url',
    placeholder: 'http://cocodataset.org',
    type: 'text',
  },
  {
    label: 'Version',
    name: 'version',
    placeholder: '1',
    type: 'text',
  },
  {
    label: 'Year',
    name: 'year',
    placeholder: '2017',
    type: 'number',
    min: 1900,
    max: 2100,
  },
  {
    label: 'Contributor',
    name: 'contributor',
    placeholder: 'COCO Consortium',
    type: 'text',
  },
  {
    label: 'Date created',
    name: 'date_created',
    placeholder: '2017/09/01',
    type: 'date',
  },
] as const
