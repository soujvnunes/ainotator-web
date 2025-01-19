// TODO: remove directive after component client ui
'use client'

import { Canvas } from 'fabric'
import NextImage from 'next/image'
import { useEffect, useId, useRef, useState } from 'react'

export default function Home() {
  const canvasRef = useRef<Canvas>(null)
  const [imageSrc, setImageSrc] = useState('')
  const canvasId = useId()

  useEffect(() => {
    const canvas = new Canvas(canvasId, {
      width: window.innerWidth,
      // 64 refers to toolbar's height
      height: window.innerHeight - 64,
    })

    canvasRef.current = canvas
  }, [])

  return (
    <main>
      {imageSrc}
      <canvas
        className="w-full h-full bg-neutral-900"
        id={canvasId}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.item(0)

          if (file) {
            const reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                setImageSrc(reader.result)
              }
            }
          }
        }}
      />
      {!!imageSrc && (
        <div className="relative h-24">
          <NextImage
            fill
            className="object-cover"
            alt="Preview"
            src={imageSrc}
          />
        </div>
      )}
    </main>
  )
}
