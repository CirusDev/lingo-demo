"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useBlurModal } from '@/store/use-blur-modal'

type Props = {
  label:    string,
  iconSrc:  string,
  href:     string
}

const SidebarItem = ({ label, iconSrc, href }:Props) => {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Button
      variant={active ? 'sidebarOutline' : 'sidebar'}
      className='justify-start h-12'
      asChild
    >
      <Link href={href}>
        <Image 
          src={iconSrc}
          alt={label}
          className='mr-5'
          height={34}
          width={34}
        />

        {label}
      </Link>
    </Button>
  )
}

export default SidebarItem