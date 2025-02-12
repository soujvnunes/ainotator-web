import { createSelector } from '@reduxjs/toolkit'

import annotatorColors from '@/consts/annotatorColors'

import selectCategories from './selectCategories'
import selectCategoryId from './selectCategoryId'

const selectCategory = createSelector(
  [selectCategoryId, selectCategories],
  (id, categories) => {
    if (!id) return

    const currentCategory = categories.find((category) => id === category.id)

    if (!currentCategory?.color) return

    return {
      ...currentCategory,
      color: `rgb(${annotatorColors.classes.channel[currentCategory.color]} / 0.4)`,
    }
  },
)

export default selectCategory
