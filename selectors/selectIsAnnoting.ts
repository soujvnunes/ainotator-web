import { createSelector } from '@reduxjs/toolkit'

import selectMode from './selectMode'

const selectIsAnnotating = createSelector(
  [selectMode],
  (mode) => mode === 'annotating',
)

export default selectIsAnnotating
