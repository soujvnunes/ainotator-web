import { type StoreState } from '@/lib/store'

export default function selectBrushWidth(state: StoreState) {
  return state.annotator.size.brush
}
