import { useDispatch } from 'react-redux'

import { type StoreDispatch } from '@/lib/store'

export default useDispatch.withTypes<StoreDispatch>()
