import { createSelector } from '@reduxjs/toolkit'

import selectCurrentImageId from './selectCurrentImageId'
import selectImages from './selectImages'

const selectCurrentImage = createSelector(
  [selectCurrentImageId, selectImages],
  (id, images) => images.find((image) => image.id === id),
)

export default selectCurrentImage
