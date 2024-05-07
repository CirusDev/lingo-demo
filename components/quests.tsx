"use client"

import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Progress } from './ui/progress'
import Image from 'next/image'
import { quests } from '@/lib/constants'

type Props = {
  points: number
}

export const Quests = ({ points }: Props) => {
  const router = useRouter()

  return (
    <div className='border-2 rouxl p-4 space-y-4'>
      <div className='flex items-center justify-between w-full space-y-2'>
        <h3 className='font-bold text-lg'>Quests</h3>

        <Button
          variant={"primaryOutline"}
          size={"sm"}
          onClick={() => router.push("/quests")}
        >
          View all
        </Button>
      </div>

      <ul className='w-full space-y-4'>
        {quests.map((quest) => {
          const progress = (points / quest.value) * 100

          return (
            <div 
              key={quest.title}
              className=" flex items-center w-full p-4 gap-x-3"
            >
              <Image 
                src={'/points.png'}
                alt="Points"
                width={40}
                height={40}
              />

              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-base font-bold">
                  {quest.title}
                </p>

                <Progress value={progress} />
              </div>

            </div>
          )
        })}
      </ul>
    </div>
  )
}