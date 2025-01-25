import { useContext } from 'react'

import CanvasRefsContext from '@/lib/CanvasRefsContext'

function useCanvasRefs() {
  return useContext(CanvasRefsContext)
}

export default useCanvasRefs
