"use client"

import { useExitModal } from "@/store/use-exit-modal"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import Image from "next/image"
import { Button } from "../ui/button"
export const ExitModal = () => {
  const router = useRouter()
  const [isclient, setIsclient] = useState(false)
  const { isOpen, close } = useExitModal()

  useEffect(() => setIsclient(true), [])

  if (!isclient) return null

  return (
    <Dialog
      open={isOpen} onOpenChange={close}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex ice w-full justify-center mb-5">
            <Image 
              src={'/mascot_sad.png'}
              alt="mascot_sad"
              height={80}
              width={80}             
            />
          </div>

          <DialogTitle className="text-center font-bold text-2xl">
            Wait, don&apos;t go
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            You&apos;re about to leave the lesson... Sure?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              className="w-full"
              size={'lg'}
              onClick={close}
            >
              Keep learning
            </Button>
            
            <Button
              variant={"dangerOutline"}
              className="w-full"
              size={'lg'}
              onClick={() => {
                close()
                router.push("/learn")
              }}
            >
              End session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}