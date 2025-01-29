import { useSelector } from 'react-redux'

import type { RootState } from './useAppStore'

export default useSelector.withTypes<RootState>()
