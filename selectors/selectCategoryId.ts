import { type StoreState } from '@/lib/store'

export default function selectCategoryId(state: StoreState) {
  return state.annotator.current.id.category
}
