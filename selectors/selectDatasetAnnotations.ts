import { type StoreState } from '@/lib/store'

export default function selectDatasetAnnotations(state: StoreState) {
  return state.dataset.annotations
}
