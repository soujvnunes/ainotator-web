import { createSelector } from '@reduxjs/toolkit'

import selectMode from './selectMode'

const selectIsWaiting = createSelector(
  [selectMode],
  (mode) => mode === 'waiting',
)

export default selectIsWaiting
