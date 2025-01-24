import CanvasRefsContext from '@/lib/CanvasRefsContext'
import { useContext } from 'react'

function useCanvasRefs() {
  return useContext(CanvasRefsContext)
}

export default useCanvasRefs
