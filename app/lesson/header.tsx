import { Progress } from "@/components/ui/progress"
import { useExitModal } from "@/store/use-exit-modal"
import { InfinityIcon, X } from "lucide-react"
import Image from "next/image"

type Props = {
  hearts:                 number
  percentage:             number
  hasActiveSubscription:  boolean  
}

export const Header = ({hearts, percentage, hasActiveSubscription }: Props) => {
  const { open } = useExitModal()
  return (
    <header className="flex lg:pt-12 pt-5 px-10 gap-x-7 items-center justify-between max-w-5xl mx-auto w-full">      
      <X
        onClick={open}
        className="text-slate-500 m-1 hover:opacity-75 transition cursor-pointer  rounded-full"
      />
      
      <Progress value={percentage}/>

      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src="/heart.png"
          alt="heart"
          height={26}
          width={26}
          className="mr-2"
        />

        {hasActiveSubscription
          ? <InfinityIcon className="h-6 w-6 stroke-2 shrink-0" />
          : hearts
        }

      </div>
    </header>
  )
}
