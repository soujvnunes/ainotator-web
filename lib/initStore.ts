import { configureStore } from '@reduxjs/toolkit'

import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import datasetApi from '@/api/datasetApi'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice from '@/slices/datasetSlice'

const datasetReducer = persistReducer(
  // TODO: redux-persist failed to create sync storage. falling back to noop storage.
  { storage, key: datasetSlice.reducerPath, blacklist: ['validation'] },
  datasetSlice.reducer,
)
const annotatorReducer = persistReducer(
  // TODO: redux-persist failed to create sync storage. falling back to noop storage.
  { storage, key: annotatorSlice.reducerPath, whitelist: ['categories', 'size'] },
  annotatorSlice.reducer,
)

export default function initStore() {
  return configureStore({
    reducer: {
      [datasetSlice.reducerPath]: datasetReducer,
      [annotatorSlice.reducerPath]: annotatorReducer,
      [datasetApi.reducerPath]: datasetApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(datasetApi.middleware)
    },
  })
}

export type Store = ReturnType<typeof initStore>
export type StoreState = ReturnType<Store['getState']>
export type StoreDispatch = Store['dispatch']
