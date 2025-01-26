import { useRef } from 'react'
import { Provider, useStore } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import annotator from '@/lib/annotator'
import dataset from '@/lib/dataset'

function getConfigureStore() {
  return configureStore({
    reducer: {
      dataset: dataset.reducer,
      annotator: annotator.reducer,
    },
  })
}

type AppStore = ReturnType<typeof getConfigureStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default useStore.withTypes<AppStore>()
export function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = getConfigureStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
