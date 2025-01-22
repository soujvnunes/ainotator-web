import AnnotatorCanvas from '@/containers/Annotator/AnnotatorCanvas'
import AnnotatorToolbar from '@/containers/Annotator/AnnotatorToolbar'
import AnnotatorProvider from '@/providers/AnnotatorProvider'
import AnnotatorRefsProvider from '@/providers/AnnotatorRefsProvider'

export default function Home() {
  return (
    <AnnotatorProvider>
      <AnnotatorRefsProvider>
        <main>
          <AnnotatorCanvas />
          <AnnotatorToolbar />
        </main>
      </AnnotatorRefsProvider>
    </AnnotatorProvider>
  )
}
