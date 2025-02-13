import { type StoreState } from '@/lib/store'

export default function selectDatasetInfo(state: StoreState) {
  return state.dataset.info
}

