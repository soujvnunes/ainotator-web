import { type StoreState } from '@/lib/store'

export default function selectCurrentCategoryId(state: StoreState) {
  return state.annotator.current.id.category
}
