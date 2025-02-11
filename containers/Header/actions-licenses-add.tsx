'use client'

import { Fieldset, Legend } from '@headlessui/react'

import type { DatasetLicense } from '@/actions'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

import useStoreDispatch from '@/hooks/useDispatch'
import useEnhancedId from '@/hooks/useEnhancedId'
import useFormSubmit from '@/hooks/useFormSubmit'
import useStoreState from '@/hooks/useStoreState'

import Button from '@/ui/Button'
import TextField from '@/ui/TextField'

import actionsLicensesAddFields from './actions-licenses-add-fields'

export default function ActionsLicensesAdd() {
  const dispatch = useStoreDispatch()
  const [id, nextId] = useEnhancedId()
  const licenses = useStoreState((state) => state.dataset.licenses)
  const imageId = useStoreState((state) => state.annotator.current.id.image)
  const formSubmit = useFormSubmit<Omit<DatasetLicense, 'id'>>((fields) => {
    dispatch(annotator.actions.setLicense(id))
    dispatch(dataset.actions.addLicense({ id, ...fields }))

    if (!!imageId && licenses.length < 1) {
      dispatch(dataset.actions.setImage({ id: imageId, license: id }))
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
            invalid={{
              when: formSubmit.fields.empty.includes(field.name),
              message: 'Empty',
            }}
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
