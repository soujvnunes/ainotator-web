'use client'

import useAppState from '@/hooks/useAppState'
import {
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { useId } from 'react'

export default function AddedCategories() {
  const id = useId()
  const categories = useAppState((state) => state.annotator.added.categories)

  return (
    <div className="data-[closed]:transform-[scale(95%)] mt-4 w-full max-w-md bg-neutral-900 duration-300 ease-out data-[closed]:opacity-0">
      <h2
        id={id}
        className="flex h-10 items-center bg-neutral-800 pl-4 text-xs font-medium uppercase tracking-wider">
        Added classes
      </h2>
      <ul
        aria-labelledby={id}
        className="flex h-16 items-center overflow-y-auto">
        {categories.map((category) => (
          <li
            key={category.id}
            className="h-16 min-w-24 truncate px-3 py-2 text-left text-sm font-medium uppercase tracking-wider"
            style={{ backgroundColor: `rgb(${category.color} / 0.6)` }}>
            <span className="mb-3 flex">
              {category.type === 'polygon' ? (
                <CubeTransparentIcon className="size-4" />
              ) : (
                <PaintBrushIcon className="size-4" />
              )}
              {category.isCrowd === 'yes' && (
                <UserGroupIcon className="ml-2 size-4" />
              )}
            </span>
            {category.name}
          </li>
        ))}
        {!categories.length && (
          <p className="px-4 text-white/60">None added yet.</p>
        )}
      </ul>
    </div>
  )
}
