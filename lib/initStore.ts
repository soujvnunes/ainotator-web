import { configureStore } from '@reduxjs/toolkit'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

export default function initStore() {
  return configureStore({
    reducer: {
      [dataset.reducerPath]: dataset.reducer,
      [annotator.reducerPath]: annotator.reducer,
    },
  })
}

export type Store = ReturnType<typeof initStore>
export type StoreState = ReturnType<Store['getState']>
export type StoreDispatch = Store['dispatch']
