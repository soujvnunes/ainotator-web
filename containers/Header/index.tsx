import Image from 'next/image'

import Actions from './Actions'
import FileDetails from './FileDetails'

export default function Header() {
  return (
    <header className="flex h-10 items-center justify-between">
      <h1 className="w-[120px]">
        <Image
          priority
          width={40}
          height={40}
          alt="Artificial Intelligence image annotation for the web"
          src="/ainotator.svg"
        />
      </h1>
      <FileDetails />
      <Actions />
    </header>
  )
}
