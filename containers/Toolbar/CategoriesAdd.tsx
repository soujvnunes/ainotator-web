'use client'

import { Fieldset, Legend } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid'

import annotator, { type AnnotatorCategory } from '@/reducers/annotator'

import useStoreDispatch from '@/hooks/useDispatch'
import useEnhancedId from '@/hooks/useEnhancedId'
import useFormSubmit from '@/hooks/useFormSubmit'

import Button from '@/components/Button'
import Dialog from '@/components/Dialog'
import IconButton from '@/components/IconButton'
import TextField from '@/components/TextField'

import CategoriesAddColors from './CategoriesAddColors'
import CategoriesAddCrowds from './CategoriesAddCrowds'
import CategoriesAddType from './CategoriesAddType'

export default function CategoriesAdd() {
  const dispatch = useStoreDispatch()
  const [id, nextId] = useEnhancedId()
  const formSubmit = useFormSubmit<Omit<AnnotatorCategory, 'id'>>((fields) => {
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
          <CategoriesAddCrowds />
          <div>
            <CategoriesAddType />
            <CategoriesAddColors />
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
