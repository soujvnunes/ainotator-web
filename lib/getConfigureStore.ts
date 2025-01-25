import { configureStore } from '@reduxjs/toolkit'

import annotator from './annotatorSlice'
import dataset from './datasetSlice'

export const getConfigureStore = () => {
  return configureStore({
    reducer: {
      dataset: dataset.reducer,
      annotator: annotator.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof getConfigureStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
