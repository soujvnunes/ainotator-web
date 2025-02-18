'use client'

import { Fieldset, Legend } from '@headlessui/react'

import annotator from '@/reducers/annotator'
import dataset, { type DatasetLicense } from '@/reducers/dataset'

import selectCurrentImageId from '@/selectors/selectCurrentImageId'
import selectDatasetLicenses from '@/selectors/selectDatasetLicenses'

import useStoreDispatch from '@/hooks/useDispatch'
import useEnhancedId from '@/hooks/useEnhancedId'
import useFormSubmit from '@/hooks/useFormSubmit'
import useStoreState from '@/hooks/useStoreState'

import Button from '@/components/Button'
import TextField from '@/components/TextField'

export default function ActionsLicensesAdd() {
  const dispatch = useStoreDispatch()
  const [id, nextId] = useEnhancedId()
  const licenses = useStoreState(selectDatasetLicenses)
  const currentImageId = useStoreState(selectCurrentImageId)
  const formSubmit = useFormSubmit<Omit<DatasetLicense, 'id'>>((fields) => {
    dispatch(annotator.actions.setLicense(id))
    dispatch(dataset.actions.addLicense({ id, ...fields }))

    if (!!currentImageId && licenses.length < 1) {
      dispatch(dataset.actions.setImage({ id: currentImageId, license: id }))
    }

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
