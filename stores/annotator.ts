import { createStore } from 'zustand'

interface AnnotatorState {
  file: boolean
}

interface AnnotatorActions {
  setFile(file: boolean): void
}

export type AnnotatorStore = AnnotatorState & AnnotatorActions

export const defaultAnnotator: AnnotatorState = {
  file: false,
}

export function createAnnotatorStore(
  initState: AnnotatorState = defaultAnnotator,
) {
  return createStore<AnnotatorStore>()((set) => ({
    ...initState,
    setFile: (file) => set(() => ({ file })),
  }))
}

export default function annotator() {
  return {
    file: false,
  }
}
