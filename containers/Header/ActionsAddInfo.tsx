'use client'

import { Fieldset, Legend } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

import dataset from '@/reducers/dataset'

import classes from '@/helpers/classes'

import useStoreDispatch from '@/hooks/useDispatch'
import useFormSubmit from '@/hooks/useFormSubmit'
import useStoreState from '@/hooks/useStoreState'

import Button from '@/ui/Button'
import Dialog from '@/ui/Dialog'
import IconButton from '@/ui/IconButton'
import TextField from '@/ui/TextField'

import actionsAddInfoFields, {
  type ActionsAddInfoFields,
} from './actionsAddInfoFields'

export default function ActionsAddInfo() {
  const dispatch = useStoreDispatch()
  const info = useStoreState((state) => state.dataset.info)
  const formSubmit = useFormSubmit<ActionsAddInfoFields>((fields) => {
    dispatch(dataset.actions.setInfo({ ...fields, year: +fields.year }))
  })

  return (
    <Dialog
      title="Info details"
      description="Fill in the information dataset details before exporting."
      renderController={(open) => (
        <IconButton
          onClick={open}
          aria-label="Add the dataset information"
          {...addAttrs({
            unknown: Object.values(info).some(
              (value) => !!value || value === 0,
            ),
          })}>
          <InformationCircleIcon className="m-auto size-6" />
        </IconButton>
      )}>
      <form onSubmit={formSubmit.onSubmit}>
        <Fieldset>
          <Legend className="sr-only">Information details.</Legend>
          {actionsAddInfoFields.map((field) => {
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
                defaultValue={info[field.name] || undefined}
                invalid={{
                  when: formSubmit.fields.empty.includes(field.name),
                  message: 'Empty',
                }}
              />
            )
          })}
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

const addAttrs = classes('data-classes-unknown:text-red-400')
