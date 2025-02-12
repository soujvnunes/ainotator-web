import { useDispatch } from 'react-redux'

import { type StoreDispatch } from '@/lib/store'

const useStoreDispatch = useDispatch.withTypes<StoreDispatch>()

export default useStoreDispatch
