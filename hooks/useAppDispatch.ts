import { useDispatch } from 'react-redux'

import { type AppStore } from './useAppStore'

export type AppDispatch = AppStore['dispatch']

const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default useAppDispatch
