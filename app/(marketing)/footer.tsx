import React from 'react'
import ReactCountryFlag from "react-country-flag"

import { Button } from '@/components/ui/button'

const Footer = () => {
  return (
    <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
      <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <ReactCountryFlag
            svg
            countryCode="US"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '40%',
              marginRight: '8px',
            }}
            aria-label="United States"
          />

          <ReactCountryFlag 
            countryCode="US" 
            style={{
              fontSize: '18px',
              lineHeight: '18px',
            }}
          />
        </Button>
        
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <ReactCountryFlag
            svg
            countryCode="ES"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '40%',
              marginRight: '8px',
            }}
            aria-label="United States"
          />

          <ReactCountryFlag 
            countryCode="ES" 
            style={{
              fontSize: '18px',
              lineHeight: '18px',
            }}
          />
        </Button>
        
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <ReactCountryFlag
            svg
            countryCode="FR"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '40%',
              marginRight: '8px',
            }}
            aria-label="United States"
          />

          <ReactCountryFlag 
            countryCode="FR" 
            style={{
              fontSize: '18px',
              lineHeight: '18px',
            }}
          />
        </Button>
        
        <Button size={'lg'} variant={'ghost'} className='w-full'>
          <ReactCountryFlag
            svg
            countryCode="CR"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '40%',
              marginRight: '8px',
            }}
            aria-label="United States"
          />

          <ReactCountryFlag 
            countryCode="CR" 
            style={{
              fontSize: '18px',
              lineHeight: '18px',
            }}
          />
        </Button>
      </div>
    </footer>
  )
}

export default Footer