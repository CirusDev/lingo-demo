import React from 'react'
import Image from 'next/image'
import { Loader } from 'lucide-react'
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className='h-20 w-full border-b-2 border-slate-200 px-4'>
      <div className='lg:max-w-screen-lg mx-auto flex items-center justify-between h-full'>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image 
            src={'/mascot.png'}
            height={40}
            width={40}
            alt='mascot'
          />

          <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>Lingo</h1>
        </div>

        <ClerkLoading>
          <Loader className='h-5 w-5 text-muted-foreground animate-spin'/>
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="flex border border-sky-400 w-10 h-10 items-center justify-center rounded-full">
              <UserButton
                afterSignOutUrl='/'
              />
            </div>
          </SignedIn>
          
          <SignedOut>
            <SignInButton
              mode='modal'
              fallbackRedirectUrl={"/learn"}
            >
              <Button variant={'ghost'} size={'lg'}>Login</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  )
}

export default Header