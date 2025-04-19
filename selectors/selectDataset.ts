import { createSelector } from '@reduxjs/toolkit'

import { type StoreState } from '@/lib/initStore'

const selectDataset = createSelector(
  (state: StoreState) => state.dataset,
  ({ validation, ...dataset }) => dataset,
)

export default selectDataset
