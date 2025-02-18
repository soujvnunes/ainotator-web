import { createSelector } from '@reduxjs/toolkit'

import selectDatasetInfo from './selectDatasetInfo'

const selectDatasetHasInfo = createSelector(
  [selectDatasetInfo],
  (datasetInfo) => Object.values(datasetInfo).some(Boolean),
)

export default selectDatasetHasInfo
