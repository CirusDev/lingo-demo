"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { Button } from "../ui/button"
import { usePracticeModal } from "@/store/use-practice-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

export const PracticeModal = () => {
  const [isclient, setIsclient] = useState(false)
  const { isOpen, close } = usePracticeModal()

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
              src={'/heart.png'}
              alt="Heart"
              height={100}
              width={100}             
            />
          </div>

          <DialogTitle className="text-center font-bold text-2xl">
            Practice lesson
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            Use practice lessons to recharge hearts and points
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
              Let&apos;s practice
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}