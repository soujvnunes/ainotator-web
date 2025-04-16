'use client'

import { useCallback } from 'react'

import { DocumentArrowUpIcon } from '@heroicons/react/24/solid'
import { FabricImage } from 'fabric'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice from '@/slices/datasetSlice'

import getDateTime from '@/helpers/getDateTime'

import useCanvas from '@/hooks/useCanvas'
import useStoreDispatch from '@/hooks/useDispatch'
import useEnhancedId from '@/hooks/useEnhancedId'
import useStoreState from '@/hooks/useStoreState'

export default function OnboardingAddFile() {
  const canvas = useCanvas()
  const dispatch = useStoreDispatch()
  const [id, nextId] = useEnhancedId()
  const licenseId = useStoreState(annotatorSlice.selectors.currentLicenseId)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      const reader = new FileReader()

      if (file == null) return

      reader.onload = async (event) => {
        const result = event.target?.result
        const _canvas = canvas.current

        if (typeof result !== 'string' || !_canvas) return

        const fabricImage = await FabricImage.fromURL(result)

        if (_canvas.width / fabricImage.width > _canvas.height / fabricImage.height) {
          fabricImage.scaleToWidth(_canvas.width)
        } else {
          fabricImage.scaleToHeight(_canvas.height)
        }

        fabricImage.selectable = false
        fabricImage.hasControls = false
        _canvas.add(fabricImage)
        _canvas.renderAll()
        dispatch(annotatorSlice.actions.setMode('annotating'))
        dispatch(annotatorSlice.actions.setImage(id))
        dispatch(
          datasetSlice.actions.addImage({
            id,
            license: licenseId,
            height: fabricImage.height,
            width: fabricImage.width,
            date_captured: getDateTime(file.lastModified),
            coco_url: '',
            flickr_url: '',
            file_name: file.name,
          }),
        )
        nextId()
      }
      reader.readAsDataURL(file)
    },
    [canvas, dispatch, id, licenseId, nextId],
  )

  return (
    <label className="text-label flex cursor-pointer items-center bg-neutral-800 pr-4 text-white">
      <span className="mr-4 flex h-10 w-10 bg-white text-black">
        <DocumentArrowUpIcon className="m-auto size-6" />
      </span>
      Pick an image
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
      />
    </label>
  )
}
