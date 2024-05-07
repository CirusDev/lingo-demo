import { getLesson, getUserProgress, getUserSubscription } from '@/db/queries'
import { redirect } from 'next/navigation'
import React from 'react'
import { Quiz } from './quiz'

const LessonPage = async() => {
  const lessonData = getLesson()
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()

  const [lesson, userProgress, userSubcription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData
  ])

  if (!lesson || !userProgress) redirect("/learn")

  const initialPercentage = lesson.challenges
    .filter((challenge) => challenge.completed)
    .length / lesson.challenges.length * 100

  return (
    <Quiz 
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubcription={userSubcription}
    />
  )
}

export default LessonPage