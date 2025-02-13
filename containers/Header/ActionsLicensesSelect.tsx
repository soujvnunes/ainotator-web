'use client'

import { useCallback, useMemo } from 'react'

import annotator from '@/reducers/annotator'
import dataset from '@/reducers/dataset'

import selectCurrentImageId from '@/selectors/selectCurrentImageId'
import selectCurrentLicenseId from '@/selectors/selectCurrentLicenseId'

import useStoreDispatch from '@/hooks/useDispatch'
import useStoreState from '@/hooks/useStoreState'

import textField from '@/styles/textField'

import RadioField from '@/components/RadioField'

export default function ActionsLicensesSelect() {
  const dispatch = useStoreDispatch()
  const currentLicenseId = useStoreState(selectCurrentLicenseId)
  const currentImageId = useStoreState(selectCurrentImageId)
  const licenses = useStoreState((state) => state.dataset.licenses)
  const handleLicense = useCallback(
    (id: number) => {
      dispatch(annotator.actions.setLicense(id))
      dispatch(dataset.actions.setImage({ id: currentImageId, license: id }))
    },
    [dispatch, currentImageId],
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
        className={textField.label.root({
          className: 'mt-4 cursor-default',
        })}>
        Licenses
      </p>
      <RadioField
        vertical
        aria-label="Licenses"
        value={currentLicenseId}
        values={licenseFields}
        onChange={handleLicense}
      />
    </>
  )
}
