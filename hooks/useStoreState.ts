import { useSelector } from 'react-redux'

import { type StoreState } from '@/lib/initStore'

const useStoreState = useSelector.withTypes<StoreState>()

export default useStoreState
