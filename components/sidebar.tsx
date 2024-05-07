"use client"

import Link from "next/link"
import Image from "next/image"
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs"

import SidebarItem from "./sidebar-item"
import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"

type Props = {
  className?: string
}

const Sidebar = ({ className }:Props) => {
  return (
    <div className={cn(
      'flex flex-col h-full lg:w-64 lg:fixed left-0 top-0 px-4 border-r-2',
      className
    )}>
      <Link href={'/'}>
        <div className='pt-8 pl-4 pb-7 flex items-center gap-x-3'>
          <Image 
            src={'/mascot.png'}
            height={40}
            width={40}
            alt='mascot'
          />

          <h1 className='text-2xl font-extrabold text-green-600 tracking-wide'>Lingo</h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem 
          label="Learn" 
          href="/learn" 
          iconSrc="/learn.png" 
        />
        
        <SidebarItem 
          label="leaderboard" 
          href="/leaderboard" 
          iconSrc="/leaderboard.png" 
        />
        
        <SidebarItem 
          label="quests" 
          href="/quests" 
          iconSrc="/quest.png" 
        />
        
        <SidebarItem 
          label="shop" 
          iconSrc="/store.png" 
          href="/shop" 
        />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <div className="inline-flex items-center justify-center text-sm font-bold uppercase  text-slate-500 transition-none h-12 gap-y-2 w-full">
              <div className="flex border border-sky-400 w-10 h-10 items-center justify-center rounded-full">
                <UserButton
                  afterSignOutUrl='/'
                />
              </div>

              <h1 className="ml-5">
                Profile
              </h1>
            </div>
            
          </SignedIn>
        </ClerkLoaded>
      </div>
    </div>
  )
}

export default Sidebar