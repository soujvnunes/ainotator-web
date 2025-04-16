import { useDispatch } from 'react-redux'

import { type StoreDispatch } from '@/lib/initStore'

const useStoreDispatch = useDispatch.withTypes<StoreDispatch>()

export default useStoreDispatch
