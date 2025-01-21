import { Outfit } from 'next/font/google'
import '@/ui/tailwind.css'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

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

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full`}>
      <body className="h-full text-white bg-black">{children}</body>
      <Script
        id="splash-screen"
        src="https://unpkg.com/ios-pwa-splash@1.0.0/cdn.min.js"
        dangerouslySetInnerHTML={{
          __html: `(function(){if(typeof window.iosPWASplash === 'function'){window.iosPWASplash('/apple-icon.png','#000000');}})();`,
        }}
      />
    </html>
  )
}
