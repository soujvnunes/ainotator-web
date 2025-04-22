import { useSelector } from 'react-redux'

import { type AppStore } from './useAppStore'

export type AppState = ReturnType<AppStore['getState']>

const useAppState = useSelector.withTypes<AppState>()

export default useAppState
