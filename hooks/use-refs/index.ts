'use client'

import { useContext } from 'react'

import { RefsContext } from '@/lib'

export default function useRefs() {
  return useContext(RefsContext)
}
