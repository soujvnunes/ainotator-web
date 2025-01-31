import { configureStore } from '@reduxjs/toolkit'

import { annotatorReducer, datasetReducer } from '@/reducers'

const store = configureStore({
  reducer: {
    dataset: datasetReducer.reducer,
    annotator: annotatorReducer.reducer,
  },
})

export default store
export type Store = typeof store
export type StoreState = ReturnType<Store['getState']>
export type StoreDispatch = Store['dispatch']
