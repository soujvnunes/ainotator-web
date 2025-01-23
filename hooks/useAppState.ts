import type { RootState } from '@/lib/getConfigureStore'
import { useSelector } from 'react-redux'

const useAppState = useSelector.withTypes<RootState>()

export default useAppState
