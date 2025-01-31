import { configureStore } from '@reduxjs/toolkit'

import { annotator, dataset } from '@/reducers'

const store = configureStore({
  reducer: {
    dataset: dataset.reducer,
    annotator: annotator.reducer,
  },
})

export default store
export type Store = typeof store
export type StoreState = ReturnType<Store['getState']>
export type StoreDispatch = Store['dispatch']
