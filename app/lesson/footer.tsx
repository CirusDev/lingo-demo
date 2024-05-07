import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle } from 'lucide-react'
import React from 'react'
import { useKey, useMedia } from 'react-use'

type Props = {
  disabled?:  boolean
  status:     "correct" | "wrong" | "none" | "completed"
  onCheck:    () => void
  lessonId?:  number
}

export const Footer = ({ disabled, status, onCheck, lessonId }: Props) => {
  useKey(
    "Enter", 
    onCheck, 
    {}, [onCheck]
  )
  const isMobile = useMedia("(max-width: 1024px)")

  return (
    <footer className={cn(
      "lg:h-36 h-24 border-t-2",
      status === "correct" && "border-transparent bg-green-100",
      status === 'wrong' && "border-transparent bg-rose-100"
    )}>
      <div className='max-w-6xl h-full mx-auto flex items-center justify-between px-6 lg:px-10'>

        {status === "correct" && (
          <div className='flex text-green-500 font-bold text-base lg:text-2xl items-center'>
            <CheckCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4' />
            Nicely done!
          </div>
        )}

        {status === "wrong" && (
          <div className='flex text-rose-500 font-bold text-base lg:text-2xl items-center'>
            <XCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4' />
            Try again.
          </div>
        )}
        
        {status === "completed" && (
          <Button
            variant={"default"}
            size={isMobile ? "sm" : "lg"}
            //use window for refire the useMount in Quiz page
            onClick={() => window.location.href = `/lesson/${lessonId}`}
          >
            Practice again.
          </Button>
        )}

        <Button
          className='ml-auto'
          disabled={disabled}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
          onClick={onCheck}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>

      </div>
      
    </footer>
  )
}
