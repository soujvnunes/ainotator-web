'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'

import { type Persistor, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import initStore, { type Store } from '@/lib/initStore'

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const store = useRef<Store>(null)
  const persistor = useRef<Persistor>(null)

  if (!store.current) store.current = initStore()

  if (!persistor.current) persistor.current = persistStore(store.current)

  return (
    <Provider store={store.current}>
      <PersistGate persistor={persistor.current}>{children}</PersistGate>
    </Provider>
  )
}
