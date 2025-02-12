import { type StoreState } from '@/lib/store'

export default function selectIsWaiting(state: StoreState) {
  return state.annotator.mode === 'waiting'
}
