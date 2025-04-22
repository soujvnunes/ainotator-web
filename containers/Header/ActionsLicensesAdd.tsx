'use client'

import { Fieldset, Legend } from '@headlessui/react'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice, { type DatasetLicense } from '@/slices/datasetSlice'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useEnhancedId from '@/hooks/useEnhancedId'
import useFormSubmit from '@/hooks/useFormSubmit'

import Button from '@/components/Button'
import TextField from '@/components/TextField'

export default function ActionsLicensesAdd() {
  const dispatch = useAppDispatch()

  const [id, nextId] = useEnhancedId()

  const licenses = useAppState(datasetSlice.selectors.licenses)
  const currentImageId = useAppState(annotatorSlice.selectors.currentImageId)

  const formSubmit = useFormSubmit<Omit<DatasetLicense, 'id'>>((fields) => {
    dispatch(annotatorSlice.actions.setLicense(id))
    dispatch(datasetSlice.actions.addLicense({ id, ...fields }))

    if (!currentImageId || !licenses.length) return

    dispatch(datasetSlice.actions.setImage({ id: currentImageId, license: id }))
    nextId()
  })

  return (
    <form onSubmit={formSubmit.onSubmit}>
      <Fieldset>
        <Legend className="sr-only">License details.</Legend>
        {actionsLicensesAddFields.map((field) => (
          <TextField
            className="mt-4"
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            invalid={[formSubmit.fields.empty.includes(field.name), 'Empty']}
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

const actionsLicensesAddFields = [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Attribution-NonCommercial-ShareAlike License',
  },
  {
    label: 'URL',
    name: 'url',
    placeholder: 'http://creativecommons.org/licenses/by-nc-sa/2.0/',
  },
] as const
