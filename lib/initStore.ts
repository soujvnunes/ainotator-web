import { configureStore } from '@reduxjs/toolkit'

import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import annotatorApi from '@/api/annotatorApi'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice from '@/slices/datasetSlice'

const datasetReducer = persistReducer(
  // TODO: redux-persist failed to create sync storage. falling back to noop storage.
  { storage, key: datasetSlice.reducerPath },
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
      [annotatorApi.reducerPath]: annotatorApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(annotatorApi.middleware)
    },
  })
}
