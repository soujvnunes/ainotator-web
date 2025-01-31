'use client'

import { Fieldset, Legend, RadioGroup } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid'

import { type AnnotatorCategory, annotatorReducer } from '@/reducers'

import { useEnhancedId, useFormSubmit, useStoreDispatch } from '@/hooks'

import {
  AnnotationRadio,
  Button,
  RadioField,
  TextField,
  textFieldStyles,
  Dialog,
  IconButton,
} from '@/ui'

import {
  addCategoryColors,
  addCategoryCrowds,
  addCategoryType,
} from './add-category-fields'

export default function AddCategory() {
  const dispatch = useStoreDispatch()
  const [id, nextId] = useEnhancedId()
  const formSubmit = useFormSubmit<Omit<AnnotatorCategory, 'id'>>((fields) => {
    // TODO: implement fields.already to implement error feedback for an existent category
    dispatch(annotatorReducer.actions.addCategory({ id, ...fields }))
    nextId()
  })

  return (
    <Dialog
      title="Annotation Class"
      description="Define class names and assign a unique color to each one."
      renderController={(open) => (
        <IconButton
          variant="filled"
          size="lg"
          aria-label="Add categories to start annotating the image"
          onClick={open}>
          <PlusIcon className="size-6" />
        </IconButton>
      )}>
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
              className="mt-2 flex"
              name="isCrowd"
              defaultValue={addCategoryCrowds[0].value}
              values={addCategoryCrowds}
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
              className="mt-2 flex"
              name="type"
              defaultValue={addCategoryType[0].value}
              values={addCategoryType}
            />
            <RadioGroup
              className="flex"
              name="color"
              defaultValue={addCategoryColors[0]}>
              {addCategoryColors.map((color) => (
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
    </Dialog>
  )
}
