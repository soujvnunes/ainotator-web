'use client'

import { useContext } from 'react'

import { CanvasContext } from '@/lib'

export default function useCanvas() {
  return useContext(CanvasContext)
}
