import { type StoreState } from '@/lib/store'

export default function selectDataset(state: StoreState) {
  return state.dataset
}
