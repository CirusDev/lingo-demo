"use client"

import Image from "next/image"
import { toast } from "sonner"
import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import { refillHearts } from "@/actions/user-progress"
import { createStripeUrl } from "@/actions/user-subscription"
import { POINTS_TO_REFILL } from "@/lib/constants"

type Props = {
  hearts:                 number
  points:                 number
  hasActiveSubscription:  boolean
}

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition()

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return

    startTransition(() => {
      refillHearts()
        .catch(() => toast.error("Something went wrong"))
    })
  }

  const onUpgrade = () => {
    startTransition(() => {      
      createStripeUrl()
        .then((resp) => {
          if (resp.data) {
            window.location.href = resp.data
          }
        })
        .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image
          src="/heart.png" 
          alt="Heart"
          height={50}
          width={50}
        />

        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>

        <Button
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
          onClick={onRefillHearts}
        >
          {hearts === 5
          ? "full"
          : (
            <div className="flex items-center">
              <Image 
                src={'/points.png'}
                alt="Points"
                height={20}
                width={20}
              />

              <p>
                {POINTS_TO_REFILL}
              </p>
            </div>
            )
          }
        </Button>
      </div>

      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image
          src={"/unlimited.png"} 
          alt="Unlimited"
          height={50}
          width={50}
        />
        
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>

        <Button
          disabled={pending}
          onClick={onUpgrade}
        >
          {hasActiveSubscription ? "setup" : "upgrade"}
        </Button>
      </div>
    </ul>
  )
}