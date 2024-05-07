"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "../ui/button"
import { useHeartsModal } from "@/store/use-hearts-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

export const HeartsModal = () => {
  const router = useRouter()
  const [isclient, setIsclient] = useState(false)
  const { isOpen, close } = useHeartsModal()

  useEffect(() => setIsclient(true), [])

  const onClick = () => {
    close()
    router.push("/store")
  }

  if (!isclient) return null

  return (
    <Dialog
      open={isOpen} onOpenChange={close}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex ice w-full justify-center mb-5">
            <Image 
              src={'/mascot_bad.png'}
              alt="mascot_sad"
              height={80}
              width={80}             
            />
          </div>

          <DialogTitle className="text-center font-bold text-2xl">
            You ain&apos;t get more hearts
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            Get Pro for unlimited hearts or purchase them in the store
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              className="w-full"
              size={'lg'}
              onClick={onClick}
            >
              Get Unlimited
            </Button>
            
            <Button
              variant={"primaryOutline"}
              className="w-full"
              size={'lg'}
              onClick={close}
            >
              No thx
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}