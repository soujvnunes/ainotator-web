import Image from 'next/image'
import HeaderControls from './Controls'
import HeaderExport from './Export'

export default function Header() {
  return (
    <header className="flex h-10 items-center justify-between">
      <h1>
        <Image
          priority
          width={40}
          height={40}
          alt="Artificial Intelligence image annotation for the web"
          src="/ainotator.svg"
        />
      </h1>
      <HeaderControls />
      <HeaderExport />
    </header>
  )
}
