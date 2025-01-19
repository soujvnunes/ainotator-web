import { useCallback, useEffect, useState } from 'react'

interface CanvasDimensionsProps {
  offset?: Partial<Record<'width' | 'height', number>>
}

export default function useCanvasDimensions(props: CanvasDimensionsProps) {
  const [innerWidth, setInnerWidth] = useState(() => window.innerWidth)
  const [innerHeight, setInnerHeight] = useState(() => window.innerHeight)
  const handleOffset = useCallback(
    (dimension: number, offset?: number) =>
      offset ? dimension - offset : dimension,
    [],
  )

  useEffect(() => {
    function handleSize() {
      setInnerWidth(window.innerWidth)
      setInnerHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleSize)

    return () => {
      window.removeEventListener('resize', handleSize)
    }
  })

  return {
    value: {
      width: handleOffset(innerWidth, props.offset?.width),
      height: handleOffset(innerHeight, props.offset?.height),
    },
    offset: props.offset,
  }
}
