'use client'

import { useCallback, useMemo } from 'react'

import { annotator, dataset } from '@/reducers'

import { useStoreDispatch, useStoreState } from '@/hooks'

import { RadioField, textFieldStyles } from '@/ui'

export default function ActionsLicensesSelect() {
  const dispatch = useStoreDispatch()
  const licenseId = useStoreState((state) => state.annotator.current.id.license)
  const imageId = useStoreState((state) => state.annotator.current.id.image)
  const licenses = useStoreState((state) => state.dataset.licenses)
  const handleLicense = useCallback(
    (id: number) => {
      dispatch(annotator.actions.setLicense(id))
      dispatch(dataset.actions.setImage({ id: imageId, license: id }))
    },
    [dispatch, imageId],
  )
  const licenseFields = useMemo(() => {
    return licenses.map((license) => ({
      value: license.id,
      children: license.name,
    }))
  }, [licenses])

  return (
    <>
      <p
        aria-hidden="true"
        className={textFieldStyles.label.root({
          className: 'mt-4 cursor-default',
        })}>
        Licenses
      </p>
      <RadioField
        vertical
        aria-label="Licenses"
        value={licenseId}
        values={licenseFields}
        onChange={handleLicense}
      />
    </>
  )
}
