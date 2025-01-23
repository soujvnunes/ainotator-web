'use client'

import { useAnnotatorState } from '@/providers/AnnotatorProvider'
import AnnotatorToolbarCategoriesItem from './AnnotatorToolbarCategoriesItem'

export default function AnnotatorToolbarCategories() {
  const categories = useAnnotatorState(
    (state) => state.annotator.added.categories,
  )

  return (
    <ul className="flex w-full">
      {categories.map((category) => (
        <li key={category.id}>
          <AnnotatorToolbarCategoriesItem {...category} />
        </li>
      ))}
    </ul>
  )
}
