import { createSelector } from '@reduxjs/toolkit'

import selectDatasetLicenses from './selectDatasetLicenses'

const selectDatasetLicensesFields = createSelector(
  [selectDatasetLicenses],
  (licenses) => licenses.map(({ id, name }) => ({ value: id, children: name })),
)

export default selectDatasetLicensesFields
