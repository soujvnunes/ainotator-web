'use client'

import { useCallback } from 'react'

import { FabricImage } from 'fabric'
import { twMerge } from 'tailwind-merge'

import annotator from '@/lib/annotator'
import dataset from '@/lib/dataset'
import getDatasetImage from '@/lib/getDatasetImage'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'

import UploaderOnboarding from './UploaderOnboarding'

export default function Uploader() {
  const mode = useAppState((state) => state.annotator.current.mode)
  const dispatch = useAppDispatch()
  const annotatorRefs = useCanvasRefs()
  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      const reader = new FileReader()

      if (file == null) return

      reader.onload = async (event) => {
        const result = event.target?.result
        const canvas = annotatorRefs.canvas.current

        if (typeof result !== 'string' || canvas == null) return

        const image = await FabricImage.fromURL(result)
        const imageId = file.lastModified
        const datasetImage = getDatasetImage({
          name: file.name,
          lastModified: imageId,
          height: image.height,
          width: image.width,
          id: {
            image: imageId,
            license: 0,
          },
        })
        const ratio = {
          x: canvas.width / image.width,
          y: canvas.height / image.height,
        }

        if (ratio.x > ratio.y) image.scaleToWidth(canvas.width)
        else image.scaleToHeight(canvas.height)

        image.selectable = false
        image.hasControls = false
        annotatorRefs.image.current = image
        canvas.add(image)
        canvas.renderAll()
        dispatch(annotator.actions.setMode('editting'))
        dispatch(dataset.actions.addImage(datasetImage))
      }
      reader.readAsDataURL(file)
    },
    [annotatorRefs.canvas, annotatorRefs.image, dispatch],
  )

  return (
    <label
      className={twMerge(
        'absolute flex h-full w-full cursor-pointer opacity-0',
        mode === 'waiting' && 'z-10 opacity-100',
      )}>
      <UploaderOnboarding />
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={mode !== 'waiting'}
        onChange={handleFileChange}
      />
    </label>
  )
}
