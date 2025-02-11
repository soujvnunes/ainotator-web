'use client'

import { Provider } from 'react-redux'

import store from '@/lib/store'

export default function StoreProvider(props: {
  readonly children: React.ReactNode
}) {
  return (
    <Provider
      store={store}
      {...props}
    />
  )
}
