import Image from 'next/image'
import HeaderControls from './HeaderControls'

export default function Header() {
  return (
    <header className="flex items-center justify-between h-10">
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
      <div className="w-10" />
    </header>
  )
}
