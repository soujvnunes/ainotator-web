import { createSelector } from '@reduxjs/toolkit'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

const selectCurrentImage = createSelector(
  annotator.selectors.currentImageId,
  dataset.selectors.images,
  (id, images) => images.find((image) => image.id === id),
)

export default selectCurrentImage
