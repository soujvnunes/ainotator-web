'use client'

import { Fieldset, Legend } from '@headlessui/react'
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'

import { annotator, dataset } from '@/lib'

import {
  useEnhancedId,
  useFormSubmit,
  useStoreDispatch,
  useStoreState,
} from '@/hooks'

import { Button, Dialog, IconButton, TextField } from '@/ui'

import uploaderAddLicenseFields, {
  type UploaderAddLicenseFields,
} from './uploader-add-license-fields'

export default function UploaderAddLicense() {
  const dispatch = useStoreDispatch()
  const licenseId = useStoreState((state) => state.annotator.current.id.license)
  const licenses = useStoreState((state) => state.dataset.licenses)
  const [id, nextId] = useEnhancedId()
  const currentLicense = licenses.find((license) => license.id === licenseId)
  const formSubmit = useFormSubmit<UploaderAddLicenseFields>((fields) => {
    dispatch(annotator.actions.setLicense(id))
    dispatch(dataset.actions.addLicense({ id, ...fields }))
    nextId()
    // TODO: next tab
  })

  return (
    <Dialog
      title="License Details"
      description="Fill in the license image details before exporting."
      renderController={(open) => (
        <IconButton
          onClick={open}
          aria-label="Add the image license">
          <DocumentArrowDownIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <form onSubmit={formSubmit.onSubmit}>
        <Fieldset>
          <Legend className="sr-only">License details.</Legend>
          {uploaderAddLicenseFields.map((field) => (
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
