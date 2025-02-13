import { createSelector } from '@reduxjs/toolkit'

import selectDatasetLicenses from './selectDatasetLicenses'

const selectDatasetLicensesFields = createSelector(
  [selectDatasetLicenses],
  (licenses) => {
    return licenses.map((license) => ({
      value: license.id,
      children: license.name,
    }))
  },
)

export default selectDatasetLicensesFields
