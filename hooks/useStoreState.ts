import { useSelector } from 'react-redux'

import { type StoreState } from '@/lib/store'

const useStoreState = useSelector.withTypes<StoreState>()

export default useStoreState
