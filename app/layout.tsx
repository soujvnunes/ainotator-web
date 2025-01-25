import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import '@/ui/tailwind.css'

import Header from '@/containers/Header'
import AppProvider from '@/providers/AppProvider'
import CanvasRefsProvider from '@/providers/CanvasRefsProvider'

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
      <body className="h-full bg-black text-white">
        <AppProvider>
          <CanvasRefsProvider>
            <Header />
            {children}
          </CanvasRefsProvider>
        </AppProvider>
      </body>
    </html>
  )
}
