import React from 'react'
import MobileSidebar from './mobile-sidebar'

const MobileHeader = () => {
  return (
    <nav className='fixed flex lg:hidden px-6 h-12 items-center bg-green-500 border-b top-0 w-full z-50'>
      <MobileSidebar />
    </nav>
  )
}

export default MobileHeader