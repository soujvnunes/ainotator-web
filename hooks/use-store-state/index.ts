import { useSelector } from 'react-redux'

import { type StoreState } from '@/lib/store'

export default useSelector.withTypes<StoreState>()
