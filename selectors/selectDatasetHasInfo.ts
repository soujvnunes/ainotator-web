import { createSelector } from '@reduxjs/toolkit'

import selectDatasetInfo from './selectDatasetInfo'

const selectDatasetHasInfo = createSelector(
  [selectDatasetInfo],
  (datasetInfo) => {
    return Object.values(datasetInfo).some((value) => !!value || value === 0)
  },
)

export default selectDatasetHasInfo
