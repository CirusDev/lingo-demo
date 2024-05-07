"use client"

import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import Sidebar from './sidebar'
import { useBlurModal } from '@/store/use-blur-modal'

const MobileSidebar = () => {
  const { isBlur, blurOpen, blurClose } = useBlurModal()

  return (
    <Sheet
      modal={false}
    >
      <SheetTrigger>
        <Menu className='text-white' />
      </SheetTrigger>

      <SheetContent 
        className='top-12 p-0 z-50 flex flex-col h-2/3'
        side={'left'}
        onFocus={blurOpen}
        onCloseAutoFocus={blurClose}
      >        
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar