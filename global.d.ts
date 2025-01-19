declare global {
  interface Window {
    iosPWASplash(iconPath: string, backgroundColor: string): void
  }
}

export {}
