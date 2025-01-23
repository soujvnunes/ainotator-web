'use client'

import useAppState from '@/hooks/useAppState'
import {
  CubeTransparentIcon,
  PaintBrushIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { useId } from 'react'

export default function ToolbarAddedCategories() {
  const id = useId()
  const categories = useAppState((state) => state.annotator.added.categories)

  return (
    <div className="w-full max-w-md mt-4 bg-neutral-900 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
      <h2
        id={id}
        className="flex items-center h-10 pl-4 text-xs font-medium tracking-wider uppercase bg-neutral-800">
        Added classes
      </h2>
      <ul
        aria-labelledby={id}
        className="flex items-center h-16 overflow-y-auto">
        {categories.map((category) => (
          <li
            key={category.id}
            className="h-16 px-3 py-2 text-sm font-medium tracking-wider text-left uppercase truncate min-w-24"
            style={{ backgroundColor: `rgb(${category.color} / 0.6)` }}>
            <span className="flex mb-3">
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
