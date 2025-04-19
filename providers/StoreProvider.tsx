'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'

import initStore, { type Store } from '@/lib/initStore'

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const store = useRef<Store>(null)

  if (!store.current) store.current = initStore()

  return <Provider store={store.current}>{children}</Provider>
}
