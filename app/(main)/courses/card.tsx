import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import Image from "next/image"

type Props = {
  id:         number
  title:      string
  imgSrc:   string
  onClick:    (id:number) => void
  disable?:   boolean
  active?:    boolean
}

export const Card = ({ id, title, imgSrc, onClick, disable, active }:Props) => {
  return (
    <div
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-52 min-w-48",
        disable && "pointer-events-none opacity-50"
      )}
      onClick={() => onClick(id)}
    >
      <div className="min-w-6 min-h-6 w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            <Check className="text-white stroke-2 h-4 w-4" />
          </div>
        )}
      </div>

      <Image 
        alt=""
        src={imgSrc}
        width={100}
        height={70}
        className="rounded-lg drop-shadow-md border object-cover"
      />

      <p className="text-neutral-700 text-center font-bold mt-3">
        {title}
      </p>
    </div>
  )
}
