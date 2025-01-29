'use client'

import { Fieldset, Legend, RadioGroup } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/24/outline'
import {
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/solid'

import annotator, {
  annotatorCategoryColors,
  type AnnotatorCategory,
} from '@/lib/annotator'

import useAppDispatch from '@/hooks/useAppDispatch'
import useFormSubmit from '@/hooks/useFormSubmit'
import useNextId from '@/hooks/useNextId'

import {
  AnnotationRadio,
  Button,
  RadioField,
  TextField,
  textFieldStyles,
} from '@/ui'

export default function AddForm() {
  const dispatch = useAppDispatch()
  const [id, nextId] = useNextId()
  const formSubmit = useFormSubmit<Omit<AnnotatorCategory, 'id'>>((fields) => {
    // TODO: implement fields.already to implement error feedback for an existent category
    dispatch(annotator.actions.addCategory({ id, ...fields }))
    nextId()
  })

  return (
    <form onSubmit={formSubmit.onSubmit}>
      <Fieldset className="space-y-4">
        <Legend className="sr-only">Class details</Legend>
        <TextField
          name="name"
          label="Name"
          placeholder="Cat"
          autoComplete="annotation class name"
          invalid={{
            when: formSubmit.fields.empty.includes('name'),
            message: 'Empty',
          }}
        />
        <TextField
          name="supercategory"
          label="Supercategory"
          placeholder="Animal"
          autoComplete="annotation super category name"
          invalid={{
            when: formSubmit.fields.empty.includes('supercategory'),
            message: 'Empty',
          }}
        />
        <div>
          <p
            aria-hidden="true"
            className={textFieldStyles.label.root({
              className: 'cursor-default',
            })}>
            Is crowd?
          </p>
          <RadioField
            aria-label="Is crowd?"
            className="flex mt-2"
            name="isCrowd"
            defaultValue={isCrowdValues[0].value}
            values={isCrowdValues}
          />
        </div>
        <div>
          <p
            aria-hidden="true"
            className={textFieldStyles.label.root({
              className: 'cursor-default',
            })}>
            Type
          </p>
          <RadioField
            aria-label="Type"
            className="flex mt-2"
            name="type"
            defaultValue={typeValues[0].value}
            values={typeValues}
          />
          <RadioGroup
            className="flex"
            name="color"
            defaultValue={annotatorCategoryColors[0]}>
            {annotatorCategoryColors.map((color) => (
              <AnnotationRadio
                compact
                key={color}
                value={color}
                color={color}
                aria-label={color}
              />
            ))}
          </RadioGroup>
          <Button
            type="submit"
            fullWidth>
            Add
          </Button>
        </div>
      </Fieldset>
    </form>
  )
}

const isCrowdValues = [
  { children: <UserGroupIcon className="size-4" />, value: 'yes' },
  { children: <UserIcon className="size-4" />, value: 'no' },
]
const typeValues = [
  { children: <StarIcon className="size-4" />, value: 'polygon' },
  { children: <PaintBrushIcon className="size-4" />, value: 'brush' },
]
