'use client'

import useAppState from '@/hooks/useAppState'
import CategoriesItem from './CategoriesItem'

export default function Categories() {
  const categories = useAppState((state) => state.annotator.added.categories)

  return (
    <ul className="flex w-full overflow-y-hidden">
      {categories.map((category) => (
        <li key={category.id}>
          <CategoriesItem {...category} />
        </li>
      ))}
    </ul>
  )
}
