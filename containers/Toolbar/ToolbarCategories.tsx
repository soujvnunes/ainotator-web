'use client'

import useAppState from '@/hooks/useAppState'
import ToolbarCategoriesItem from './ToolbarCategoriesItem'

export default function ToolbarCategories() {
  const categories = useAppState((state) => state.annotator.added.categories)

  return (
    <ul className="flex w-full overflow-y-hidden">
      {categories.map((category) => (
        <li key={category.id}>
          <ToolbarCategoriesItem {...category} />
        </li>
      ))}
    </ul>
  )
}
