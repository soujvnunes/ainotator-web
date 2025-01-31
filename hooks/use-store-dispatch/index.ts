import { useDispatch } from 'react-redux'

import { type StoreDispatch } from '@/lib'

export default useDispatch.withTypes<StoreDispatch>()
