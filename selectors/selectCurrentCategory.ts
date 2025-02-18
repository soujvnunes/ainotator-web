import { createSelector } from '@reduxjs/toolkit'

import selectCategories from './selectCategories'
import selectCurrentCategoryId from './selectCurrentCategoryId'

const selectCurrentCategory = createSelector(
  [selectCurrentCategoryId, selectCategories],
  (id, categories) => {
    if (!id) return

    const currentCategory = categories.find((category) => id === category.id)

    if (!currentCategory?.color) return

    return {
      ...currentCategory,
      color: `rgb(${currentCategory.color} / 0.4)`,
    }
  },
)

export default selectCurrentCategory
