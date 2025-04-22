'use client'

import { useCallback } from 'react'

import { useClose } from '@headlessui/react'

import annotatorSlice from '@/slices/annotatorSlice'
import datasetSlice from '@/slices/datasetSlice'

import useAppDispatch from '@/hooks/useAppDispatch'
import useAppState from '@/hooks/useAppState'

import textField from '@/styles/textField'

import Button from '@/components/Button'
import RadioField from '@/components/RadioField'

export default function ActionsLicensesSelect() {
  const closeActionsLicenses = useClose()

  const dispatch = useAppDispatch()

  const currentLicenseId = useAppState(annotatorSlice.selectors.currentLicenseId)
  const currentImageId = useAppState(annotatorSlice.selectors.currentImageId)
  const licensesFields = useAppState(datasetSlice.selectors.licensesFields)

  const handleLicense = useCallback(
    (id: number) => {
      dispatch(annotatorSlice.actions.setLicense(id))
      dispatch(datasetSlice.actions.setImage({ id: currentImageId, license: id }))
    },
    [dispatch, currentImageId],
  )

  return (
    <>
      <p
        aria-hidden="true"
        className={textField.label.root({
          className: 'mt-4 cursor-default',
        })}>
        Licenses
      </p>
      <RadioField
        vertical
        aria-label="Licenses"
        value={currentLicenseId}
        values={licensesFields}
        onChange={handleLicense}
      />
      <Button
        fullWidth
        onClick={closeActionsLicenses}>
        Close
      </Button>
    </>
  )
}
