import { useSelector } from 'react-redux'

import { type StoreState } from '@/lib'

export default useSelector.withTypes<StoreState>()
