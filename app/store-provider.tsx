'use client'

import { useState } from 'react'
import { Provider } from 'react-redux'

import { getStore } from '@/lib'

export default function StoreProvider(props: {
  readonly children: React.ReactNode
}) {
  const [store] = useState(() => getStore())

  return (
    <Provider
      store={store}
      {...props}
    />
  )
}
