import { redirect } from 'next/navigation'

import { Unit } from './unit'
import { Header } from './header'
import { lessons, units as unitsSchema } from '@/db/schema' //erase in case of erasing bottom comment
import { FeedWrapper } from '@/components/feed-wrapper'
import { UserProgress } from '@/components/user-progress'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from '@/db/queries'
import { auth } from '@clerk/nextjs/server'
import { Promo } from '@/components/promo'
import { Quests } from '@/components/quests'

const LearnPage = async() => {
  const { userId } = auth()
  if (!userId) redirect("/")

  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits()
  const userSubscriptionData = getUserSubscription()

  const [userProgress, units, courseProgress, lessonPercentage,userSubscription] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData
  ])

  if (!userProgress || !userProgress.activeCourse) redirect("/courses")

  if (!courseProgress) redirect('/courses')

  const isPro = !!userSubscription?.isActive

  return (
    <div className={`flex flex-row-reverse gap-12 px-6 py-0`}>
      <StickyWrapper>
        <UserProgress 
          activeCoure={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        {!isPro && <Promo />}
        
        <Quests points={userProgress.points} />

      </StickyWrapper>
      
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />

        {units.map((unit) => (
          <div key={unit.id} className='mb-10'>
            <Unit 
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              // activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
              //   unit: typeof unitsSchema.$inferSelect
              // } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  )
}

export default LearnPage