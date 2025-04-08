'use client'

import { useCallback } from 'react'

import { DocumentArrowUpIcon } from '@heroicons/react/24/solid'
import { FabricImage } from 'fabric'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

import getDateTime from '@/helpers/getDateTime'

import useCanvas from '@/hooks/useCanvas'
import useStoreDispatch from '@/hooks/useDispatch'
import useEnhancedId from '@/hooks/useEnhancedId'
import useStoreState from '@/hooks/useStoreState'

export default function OnboardingAddFile() {
  const canvas = useCanvas()
  const dispatch = useStoreDispatch()
  const [id, nextId] = useEnhancedId()
  const licenseId = useStoreState(annotator.selectors.currentLicenseId)

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0)
      const reader = new FileReader()

      if (file == null) return

      reader.onload = async (event) => {
        const result = event.target?.result
        const _canvas = canvas.current

        if (typeof result !== 'string' || !_canvas) return

        const image = await FabricImage.fromURL(result)

        if (_canvas.width / image.width > _canvas.height / image.height) {
          image.scaleToWidth(_canvas.width)
        } else {
          image.scaleToHeight(_canvas.height)
        }

        image.selectable = false
        image.hasControls = false
        _canvas.add(image)
        _canvas.renderAll()
        dispatch(annotator.actions.setMode('annotating'))
        dispatch(annotator.actions.setImage(id))
        dispatch(
          dataset.actions.addImage({
            id,
            license: licenseId,
            height: image.height,
            width: image.width,
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
