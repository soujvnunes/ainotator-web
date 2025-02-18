import { type StoreState } from '@/lib/store'

export default function selectMode(state: StoreState) {
  return state.annotator.mode
}
