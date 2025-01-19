// TODO: remove directive after component client ui
'use client'

import { Canvas, FabricImage, PencilBrush } from 'fabric'
import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const drawingModes = ['brush', 'polygon'] as const

type DrawingModes = (typeof drawingModes)[number]

export default function Home() {
  const canvasRef = useRef<Canvas>(null)
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [drawingMode, setDrawingMode] = useState<DrawingModes | null>(null)
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
    const canvas = new Canvas(node.id, {
      width: window.innerWidth,
      // TODO: move 64 (toolbar's height) to the design system
      height: window.innerHeight - 64,
    })
    canvasRef.current = canvas

    return () => {
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (canvas != null) {
      canvas.isDrawingMode = !!drawingMode

      if (drawingMode === 'brush') {
        canvas.freeDrawingBrush = new PencilBrush(canvas)
        canvas.freeDrawingBrush.color = 'rgba(255,0,0,0.5)'
        canvas.freeDrawingBrush.width = 10
      }
    }
  }, [drawingMode, canvasRef])

  const handleBrush = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setDrawingMode(event.currentTarget.name as DrawingModes)
    },
    [],
  )

  return (
    <main>
      <div
        className={twMerge(
          'relative bg-neutral-900 transition-[background-color] h-[calc(100vh-64px)]',
          !currentFile && 'hover:bg-neutral-900/60',
        )}>
        <label
          className={twMerge(
            'absolute flex w-full h-full cursor-pointer',
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
          id="ainotator"
          ref={handleCanvas}
        />
      </div>
      <div className="h-16">
        <div className="space-x-4">
          {drawingModes.map((mode) => (
            <button
              type="button"
              className="disabled:text-white/60"
              key={mode}
              name={mode}
              onClick={handleBrush}
              disabled={
                !canvasRef.current || (!!drawingMode && drawingMode !== mode)
              }>
              {mode}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
