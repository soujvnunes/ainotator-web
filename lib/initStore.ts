import { configureStore } from '@reduxjs/toolkit'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice, { datasetApi } from '@/slices/datasetSlice'

export default function initStore() {
  return configureStore({
    reducer: {
      [datasetSlice.reducerPath]: datasetSlice.reducer,
      [annotatorSlice.reducerPath]: annotatorSlice.reducer,
      [datasetApi.reducerPath]: datasetApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(datasetApi.middleware)
    },
  })
}

export type Store = ReturnType<typeof initStore>
export type StoreState = ReturnType<Store['getState']>
export type StoreDispatch = Store['dispatch']
