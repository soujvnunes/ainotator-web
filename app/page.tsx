// TODO: remove directive after component client ui
'use client'

import { Canvas, FabricImage } from 'fabric'
import { useCallback, useEffect, useId, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<Canvas>(null)
  const canvasId = useId()
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      const canvas = canvasRef.current
      const reader = new FileReader()

      if (file == null) return

      reader.onload = async (event) => {
        const result = event.target?.result

        if (typeof result === 'string' && canvas != null) {
          const image = await FabricImage.fromURL(result)

          image.scaleToWidth(window.innerWidth)
          canvas.backgroundImage = image
          canvas.renderAll()
        }
      }
      reader.readAsDataURL(file)
    },
    [],
  )

  useEffect(() => {
    const canvas = new Canvas(canvasId, {
      width: window.innerWidth,
      // TODO: get 64 (refers to toolbar's height) dynamically
      height: window.innerHeight - 64,
    })

    canvasRef.current = canvas
  }, [])

  return (
    <main>
      <canvas id={canvasId} />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </main>
  )
}
