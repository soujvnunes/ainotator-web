import { type StoreState } from '@/lib/store'

export default function selectCurrentImageId(state: StoreState) {
  return state.annotator.current.id.image
}
