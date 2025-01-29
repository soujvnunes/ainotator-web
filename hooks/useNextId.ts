'use client'

import { useCallback, useState } from 'react'

export default function useNextId() {
  const [id, setId] = useState(() => Date.now())
  const nextId = useCallback(() => setId(() => Date.now()), [])

  return [id, nextId] as const
}
