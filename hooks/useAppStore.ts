import { useStore } from 'react-redux'

import initStore from '@/lib/initStore'

export type AppStore = ReturnType<typeof initStore>

const useAppStore = useStore.withTypes<AppStore>()

export default useAppStore
