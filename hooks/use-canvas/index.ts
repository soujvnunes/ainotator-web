'use client'

import { useContext } from 'react'

import CanvasContext from '@/lib/CanvasContext'

export default function useCanvas() {
  return useContext(CanvasContext)
}
