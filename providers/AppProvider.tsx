'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'

import { getConfigureStore, type AppStore } from '@/lib/getConfigureStore'

export default function AppProvider({ children }: React.PropsWithChildren) {
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = getConfigureStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
