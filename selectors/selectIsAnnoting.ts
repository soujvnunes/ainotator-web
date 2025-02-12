import { type StoreState } from '@/lib/store'

export default function selectIsAnnotating(state: StoreState) {
  return state.annotator.mode === 'annotating'
}
