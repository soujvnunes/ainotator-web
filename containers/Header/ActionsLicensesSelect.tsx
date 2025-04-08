'use client'

import { useCallback } from 'react'

import { useClose } from '@headlessui/react'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import textField from '@/styles/textField'

import Button from '@/components/Button'
import RadioField from '@/components/RadioField'

export default function ActionsLicensesSelect() {
  const closeActionsLicenses = useClose()
  const dispatch = useStoreDispatch()
  const currentLicenseId = useStoreState(annotator.selectors.currentLicenseId)
  const currentImageId = useStoreState(annotator.selectors.currentImageId)
  const licensesFields = useStoreState(dataset.selectors.licensesFields)
  const handleLicense = useCallback(
    (id: number) => {
      dispatch(annotator.actions.setLicense(id))
      dispatch(dataset.actions.setImage({ id: currentImageId, license: id }))
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
