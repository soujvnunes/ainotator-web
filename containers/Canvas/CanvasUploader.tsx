'use client'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'
import useCanvasRefs from '@/hooks/useCanvasRefs'
import getDatasetImage from '@/lib/getDatasetImage'
import {
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  PaintBrushIcon,
  PlusIcon,
} from '@heroicons/react/24/solid'
import { FabricImage } from 'fabric'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

export default function CanvasUploader() {
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
        dispatch.annotator.setMode('editting')
        dispatch.dataset.addImage(datasetImage)
      }
      reader.readAsDataURL(file)
    },
    [],
  )

  return (
    <label
      className={twMerge(
        'absolute flex w-full h-full cursor-pointer opacity-0',
        mode === 'waiting' && 'z-10 opacity-100',
      )}>
      <h2 className="flex flex-col items-center m-auto text-4xl text-center lg:text-6xl">
        <p className="text-xs font-medium tracking-wide uppercase text-white/60">
          AINotator WEB
        </p>
        Start by adding <br /> an image
        <ul className="inline-flex flex-col items-center mt-4 space-y-1 text-white/60">
          <li className="flex items-center text-sm">
            <span className="flex w-4 h-4 mr-2 bg-white">
              <DocumentArrowUpIcon className="w-3 h-3 m-auto fill-black" />
            </span>
            Pick a image
          </li>
          <li className="flex items-center text-sm">
            <span className="flex w-4 h-4 mr-2 bg-white">
              <PlusIcon className="w-3 h-3 m-auto fill-black" />
            </span>
            Add class names
          </li>
          <li className="flex items-center text-sm">
            <span className="flex w-4 h-4 mr-2 bg-white">
              <PaintBrushIcon className="w-3 h-3 m-auto fill-black" />
            </span>
            Annotate your image
          </li>
          <li className="flex items-center text-sm">
            <span className="flex w-4 h-4 mr-2 bg-white">
              <DocumentArrowDownIcon className="w-3 h-3 m-auto fill-black" />
            </span>
            Export the annotations in COCO format
          </li>
        </ul>
      </h2>
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
