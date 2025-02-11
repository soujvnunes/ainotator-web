import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'

import CanvasProvider from '@/providers/CanvasProvider'
import StoreProvider from '@/providers/StoreProvider'

import '@/styles/tailwind.css'

import { Header } from '@/containers'

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
      className={outfit.variable}>
      <body>
        <StoreProvider>
          <CanvasProvider>
            <Header />
            {children}
          </CanvasProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
