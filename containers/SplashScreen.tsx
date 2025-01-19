'use client'

import Script from 'next/script'

export default function SplashScreen() {
  return (
    <Script
      id="ios-pwa-splash-script"
      src="https://unpkg.com/ios-pwa-splash@1.0.0/cdn.min.js"
      onLoad={() => {
        if (typeof window.iosPWASplash === 'function') {
          window.iosPWASplash('/apple-icon.png', '#000000')
        }
      }}
    />
  )
}
