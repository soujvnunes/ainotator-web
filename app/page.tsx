// TODO: remove directive after component client ui
'use client'

import { Canvas, FabricImage, PencilBrush } from 'fabric'
import type { Path, TPointerEvent, TPointerEventInfo } from 'fabric'
import { useCallback, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const modes = ['brush', 'polygon'] as const

type DrawingModes = (typeof modes)[number]

export default function Home() {
  const canvasRef = useRef<Canvas>(null)
  const imageRef = useRef<FabricImage>(null)
  const [currentImage, setCurrentImage] = useState<File | null>(null)
  const [currentMode, setCurrentMode] = useState<DrawingModes | null>(null)
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      const reader = new FileReader()

      if (file == null) return

      reader.onload = async (event) => {
        const result = event.target?.result
        const canvas = canvasRef.current

        if (typeof result !== 'string' || canvas == null) return

        const image = await FabricImage.fromURL(result)
        const ratio = {
          x: canvas.width / image.width,
          y: canvas.height / image.height,
        }

        if (ratio.x > ratio.y) image.scaleToWidth(canvas.width)
        else image.scaleToHeight(canvas.height)

        image.selectable = false
        image.hasControls = false
        canvas.add(image)
        canvas.renderAll()

        imageRef.current = image
      }
      reader.readAsDataURL(file)
      setCurrentImage(file)
    },
    [],
  )
  const handleCanvas = useCallback((node: HTMLCanvasElement) => {
    const canvas = new Canvas(node.id, {
      width: window.innerWidth,
      // TODO: move 64 (toolbar's height) to the design system
      height: window.innerHeight - 64,
    })

    function handleMouseUp() {
      const objects = canvas.getObjects()
      const brush = objects.find((object): object is Path =>
        object.isType('path'),
      )

      if (brush) {
        const { width, height } = brush.getBoundingRect()
        const annotation = {
          segmentation: brush.path.map(([cmd, ...points]) => points),
          area: width * height,
          iscrowd: 0,
          image_id: 0, // TODO: dynamically when class is setted
          bbox: [brush.left, brush.top, width, height],
          category_id: 0, // TODO: dynamically when class is setted
          id: 0,
        }

        console.log('up', { annotation })
      }
    }

    canvas.on({
      'mouse:up': handleMouseUp,
    })

    canvasRef.current = canvas

    return () => {
      canvas.dispose()
      canvas.off({
        'mouse:up': handleMouseUp,
      })
    }
  }, [])
  const handleBrush = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const mode = event.currentTarget.name as DrawingModes

      setCurrentMode((prevMode) => {
        const canvas = canvasRef.current
        const newMode = prevMode === mode ? null : mode

        if (canvas != null) {
          canvas.isDrawingMode = !!newMode

          if (newMode === 'brush') {
            canvas.freeDrawingBrush = new PencilBrush(canvas)
            canvas.freeDrawingBrush.color = 'rgba(255,0,0,0.5)'
            canvas.freeDrawingBrush.width = 20
          }
        }

        return newMode
      })
    },
    [],
  )

  return (
    <main>
      <div
        className={twMerge(
          'relative bg-neutral-900 transition-[background-color] h-[calc(100vh-64px)]',
          !currentImage && 'hover:bg-neutral-900/60',
        )}>
        <label
          className={twMerge(
            'absolute flex w-full h-full cursor-pointer',
            !currentImage && 'z-10',
            !!currentImage && 'opacity-0',
          )}>
          <span className="m-auto">Add a file</span>
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={!!currentImage}
            onChange={handleFileChange}
          />
        </label>
        <canvas
          id="ainotator"
          ref={handleCanvas}
        />
      </div>
      <div className="flex items-center h-16 px-4">
        <div className="space-x-4">
          {modes.map((mode) => (
            <button
              type="button"
              className="disabled:text-white/60"
              key={mode}
              name={mode}
              onClick={handleBrush}
              disabled={
                !currentImage || (!!currentMode && currentMode !== mode)
              }>
              {mode}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
