// TODO: remove directive after component client ui
'use client'

import useCanvasDimensions from '@/hooks/useCanvasDimensions'
import { Canvas, FabricImage } from 'fabric'
import { useCallback, useId, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Home() {
  const canvasDimensions = useCanvasDimensions({ offset: { height: 64 } })
  const canvasRef = useRef<Canvas>(null)
  const canvasId = useId()
  const [currentFile, setCurrentFile] = useState<File | null>(null)
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
      setCurrentFile(file)
    },
    [],
  )
  const handleCanvas = useCallback((node: HTMLCanvasElement) => {
    const canvas = new Canvas(node.id, canvasDimensions.value)

    canvasRef.current = canvas

    return () => {
      canvas.dispose()
    }
  }, [])

  return (
    <main>
      <div
        className="relative bg-neutral-900"
        style={{ height: canvasDimensions.value.height }}>
        <label
          className={twMerge(
            'absolute flex w-full h-full',
            !currentFile && 'z-10',
            !!currentFile && 'opacity-0',
          )}>
          <span className="m-auto">Add a file</span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={!!currentFile}
            onChange={handleFileChange}
          />
        </label>
        <canvas
          id={canvasId}
          ref={handleCanvas}
        />
      </div>
      <div style={{ height: canvasDimensions.offset?.height }}>tools</div>
    </main>
  )
}
