'use client'

import { Fieldset, Legend, RadioGroup } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid'

import annotatorColors from '@/consts/annotatorColors'

import annotator, { type AnnotatorCategory } from '@/reducers/annotator'

import useStoreDispatch from '@/hooks/useDispatch'
import useEnhancedId from '@/hooks/useEnhancedId'
import useFormSubmit from '@/hooks/useFormSubmit'

import textField from '@/styles/textField'

import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import IconButton from '@/components/IconButton'
import RadioField from '@/components/RadioField'
import TextField from '@/components/TextField'

import categoriesAddColors from './categoriesAddColors'
import categoriesAddCrowds from './categoriesAddCrowds'
import categoriesAddType from './categoriesAddType'

export default function CategoriesAdd() {
  const dispatch = useStoreDispatch()
  const [id, nextId] = useEnhancedId()
  const formSubmit = useFormSubmit<Omit<AnnotatorCategory, 'id'>>((fields) => {
    // TODO: implement fields.already to implement error feedback for an existent category
    dispatch(annotator.actions.addCategory({ id, ...fields }))
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
            className="mt-4"
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
              className={textField.label.root({
                className: 'cursor-default',
              })}>
              Is crowd?
            </p>
            <RadioField
              aria-label="Is crowd?"
              className="mt-2 flex"
              name="isCrowd"
              defaultValue={categoriesAddCrowds[0].value}
              values={categoriesAddCrowds}
            />
          </div>
          <div>
            <p
              aria-hidden="true"
              className={textField.label.root({
                className: 'cursor-default',
              })}>
              Type
            </p>
            <RadioField
              aria-label="Type"
              className="mt-2 flex"
              name="type"
              defaultValue={categoriesAddType[0].value}
              values={categoriesAddType}
            />
            <RadioGroup
              className="flex"
              name="color"
              defaultValue={annotatorColors.value[0]}>
              {categoriesAddColors}
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
