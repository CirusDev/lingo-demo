import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { InfinityIcon } from "lucide-react"

type Props = {
  activeCoure: {
    title:      string
    imageSrc:   string
  }
  hearts:                 number
  points:                 number
  hasActiveSubscription:  boolean
}

export const UserProgress = ({ activeCoure, hearts, points, hasActiveSubscription }:Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href={'/courses'}>
        <Button variant={'ghost'}>
          <Image
            src={activeCoure.imageSrc}
            alt={activeCoure.title}
            className="rounded-lg border"
            width={34}
            height={34}
          />
        </Button>
      </Link>
      
      <Link href={'/shop'}>
        <Button variant={'ghost'} className="text-orange-500">
          <Image
            src={'/points.png'}
            alt={'points'}
            className="mr-2"
            width={34}
            height={24}
          />

          {points}
        </Button>
      </Link>
      
      <Link href={'/shop'}>
        <Button variant={'ghost'} className="text-rose-500">
          <Image
            src={'/heart.png'}
            alt={'points'}
            className="mr-2"
            width={22}
            height={22}
          />

          {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-2" /> : hearts}
        </Button>
      </Link>
      
    </div>
  )
}
