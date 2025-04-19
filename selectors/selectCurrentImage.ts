import { createSelector } from '@reduxjs/toolkit'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice from '@/slices/datasetSlice'

const selectCurrentImage = createSelector(
  annotatorSlice.selectors.currentImageId,
  datasetSlice.selectors.images,
  (id, images) => images.find((image) => image.id === id),
)

export default selectCurrentImage
