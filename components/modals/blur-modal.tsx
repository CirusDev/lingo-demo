"use client"

import { useBlurModal } from '@/store/use-blur-modal'
import React from 'react'

export const BlurModal = () => {
  const { isBlur } = useBlurModal()

  return (
    <div
      className={`
        absolute z-20
        ${isBlur 
          ? "w-full h-full bg-black/60 transition Xblur-2xl" 
          : ""
        }
      `}
    />
  )
}