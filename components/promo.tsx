"use client"

import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export const Promo = () => {
  const router = useRouter()

  return (
    <div className='border-2 rouxl p-4 space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center gap-x-2'>
          <Image
            src="/unlimited.png"
            alt='Unlimited'
            height={26}
            width={26}
          />

          <h3 className='font-bold text-lg'>Upgrade to Pro</h3>
        </div>

        <p className='text-muted-foreground'>Get unlimited hearts</p>
      </div>

      <Button
        variant={"super"}
        className='w-full'
        size={"lg"}
        onClick={() => router.push("/shop")}
      >
        Upgrade today
      </Button>
    </div>
  )
}