import { FeedWrapper } from '@/components/feed-wrapper'
import { StickyWrapper } from '@/components/sticky-wrapper'
import React from 'react'
import { Header } from './header'
import { UserProgress } from '@/components/user-progress'

const LearnPage = () => {
  return (
    <div className='flex flex-row-reverse gap-12 px-6'>
      <StickyWrapper>
        <UserProgress 
          activeCoure={{ title: 'Spanish', imageSrc: '/es.png' }}
          hearts={5}
          points={100}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      
      <FeedWrapper>
        <Header title='Spanish' />
      </FeedWrapper>

    </div>
  )
}

export default LearnPage