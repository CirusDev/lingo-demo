
import { redirect } from 'next/navigation'

import { Unit } from './unit'
import { Header } from './header'
import { lessons, units as unitsSchema } from '@/db/schema'
import { FeedWrapper } from '@/components/feed-wrapper'
import { UserProgress } from '@/components/user-progress'
import { StickyWrapper } from '@/components/sticky-wrapper'
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from '@/db/queries'

const LearnPage = async() => {
  const userProgressData = getUserProgress()
  const courseProgressData = getCourseProgress()
  const lessonPercentageData = getLessonPercentage()
  const unitsData = getUnits()

  const [
    userProgress, 
    units, 
    courseProgress, 
    lessonPercentage
    ] = await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData
  ])

  if (!userProgress || !userProgress.activeCourse) redirect("/courses")

  if (!courseProgress) redirect('/courses')

  return (
    <div className='flex flex-row-reverse gap-12 px-6'>
      <StickyWrapper>
        <UserProgress 
          activeCoure={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
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