import { Outfit } from 'next/font/google'
import '@/ui/tailwind.css'
import type { Metadata, Viewport } from 'next'
import SplashScreen from '@/containers/SplashScreen'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit-sans',
})

export const metadata: Metadata = {
  title: 'AINotator',

  description:
    'Interactive AI-Powered Annotation for Precise Data Segmentation',
  appleWebApp: {
    capable: true,
    title: 'AINotator',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full`}>
      <body className="h-full text-white bg-black">{children}</body>
      <SplashScreen />
    </html>
  )
}
