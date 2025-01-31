'use client'

import { Fieldset, Legend } from '@headlessui/react'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

import { annotator, dataset } from '@/reducers'

import {
  useEnhancedId,
  useFormSubmit,
  useStoreDispatch,
  useStoreState,
} from '@/hooks'

import { Button, Dialog, IconButton, TextField } from '@/ui'

import actionsSelectLicenseFields, {
  type ActionsSelectLicenseFields,
} from './actions-select-license-fields'

export default function ActionsSelectLicense() {
  const dispatch = useStoreDispatch()
  const licenseId = useStoreState((state) => state.annotator.current.id.license)
  const licenses = useStoreState((state) => state.dataset.licenses)
  const [id, nextId] = useEnhancedId()
  const currentLicense = licenses.find((license) => license.id === licenseId)
  const formSubmit = useFormSubmit<ActionsSelectLicenseFields>((fields) => {
    dispatch(annotator.actions.setLicense(id))
    dispatch(dataset.actions.addLicense({ id, ...fields }))
    nextId()
  })

  return (
    <Dialog
      title="Select the image license"
      description="Fill in the license image details or select a previous one."
      renderController={(open) => (
        <IconButton
          onClick={open}
          aria-label="Select or add an image license">
          <CheckBadgeIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <form onSubmit={formSubmit.onSubmit}>
        <Fieldset>
          <Legend className="sr-only">License details.</Legend>
          {actionsSelectLicenseFields.map((field) => (
            <TextField
              className="mt-4"
              key={field.name}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              defaultValue={currentLicense?.[field.name]}
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
    </Dialog>
  )
}
