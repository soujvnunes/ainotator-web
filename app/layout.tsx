import { Outfit } from 'next/font/google'
import '@/ui/tailwind.css'
import type { Metadata, Viewport } from 'next'
import Header from '@/containers/Header/Header'
import AnnotatorProvider from '@/providers/AnnotatorProvider'
import AnnotatorRefsProvider from '@/providers/AnnotatorRefsProvider'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit-sans',
})
export const metadata: Metadata = {
  title: 'AINotator',
  description: 'Brush and polygon design tools for precise data segmentation',
  appleWebApp: {
    capable: true,
    title: 'AINotator',
    statusBarStyle: 'black-translucent',
  },
}
export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full`}>
      <body className="h-full text-white bg-black">
        <AnnotatorProvider>
          <AnnotatorRefsProvider>
            <Header />
            {children}
          </AnnotatorRefsProvider>
        </AnnotatorProvider>
      </body>
    </html>
  )
}
