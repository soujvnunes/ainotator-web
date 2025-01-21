import { configureStore } from '@reduxjs/toolkit'
import dataset from './dataset'
import annotator from './annotator'

export const makeStore = () => {
  return configureStore({
    reducer: {
      dataset: dataset.reducer,
      annotator: annotator.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
