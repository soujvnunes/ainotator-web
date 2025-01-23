import { configureStore } from '@reduxjs/toolkit'
import dataset from './datasetSlice'
import annotator from './annotatorSlice'

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
