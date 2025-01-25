import { useSelector } from 'react-redux'

import type { RootState } from '@/lib/getConfigureStore'

const useAppState = useSelector.withTypes<RootState>()

export default useAppState
