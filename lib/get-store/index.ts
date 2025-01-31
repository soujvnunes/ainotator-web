import { configureStore } from '@reduxjs/toolkit'

import annotatorSlice from '../annotator'
import datasetSlice from '../dataset'

export default function getStore() {
  return configureStore({
    reducer: {
      dataset: datasetSlice.reducer,
      annotator: annotatorSlice.reducer,
    },
  })
}

export type Store = ReturnType<typeof getStore>
export type StoreState = ReturnType<Store['getState']>
export type StoreDispatch = Store['dispatch']
