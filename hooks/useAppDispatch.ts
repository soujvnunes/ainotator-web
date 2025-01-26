import { useDispatch } from 'react-redux'

import type { AppDispatch } from './useAppStore'

export default useDispatch.withTypes<AppDispatch>()
