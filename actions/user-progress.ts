"use server"

import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth, currentUser } from '@clerk/nextjs/server'

import db from '@/db/drizzle'
import { POINTS_TO_REFILL } from '@/lib/constants'
import { challengeProgress, challenges, userProgress } from '@/db/schema'
import { getCourseById, getUserProgress, getUserSubscription } from '@/db/queries'


export const upsertUserProgress = async(couseId: number) => {
  const { userId } = auth()
  const user = await currentUser()

  if (!user || !userId) throw new Error('Unauthorized')

  const course = await getCourseById(couseId)
  if (!course) throw new Error('Course not found')
  
  if (!course.units.length || !course.units[0].lessons.length) {
    throw new Error('Course id empty')
  }

  const existingUserProgress = await getUserProgress()
  const startRevalidate = () => {
    revalidatePath("/courses")
    revalidatePath("/learn")
    redirect("/learn")    
  }

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activeCourseId: couseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "mascot.png"
    })

    startRevalidate()
  }

  await db.insert(userProgress).values({
    userId,
    activeCourseId: couseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "mascot.png"
  })

  startRevalidate()
}

export const reduceHearts = async(challengeId: number) => {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  const currentUserProgress = await getUserProgress()
  const userSubscription = await getUserSubscription()

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId)
  })
  if (!challenge) throw new Error("Challenge not found")
  
  const lessonId = challenge.lessonId

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    )
  })

  const isPractice = !!existingChallengeProgress

  if (isPractice) return { error: "practice"}

  if (!currentUserProgress) throw new Error("User progress not found")

  if (userSubscription?.isActive) {
    return { error: "subscription"}
  }

  if (currentUserProgress.hearts === 0 && !isPractice) {
    return { error: "hearts"}
  }

  await db.update(userProgress).set({
    hearts: Math.max(currentUserProgress.hearts - 1, 0)
  })
  .where(
    eq(userProgress.userId, userId)
  )

  revalidatePath('/learn')
  revalidatePath('/lesson')
  revalidatePath(`/lesson/${lessonId}`)
  revalidatePath('/quests')
  revalidatePath('/leaderboard')
}

export const refillHearts = async() => {
  const currentUserProgress = await getUserProgress()

  if (!currentUserProgress) {
    throw new Error("User progress not found")
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts are full")
  }

  if (currentUserProgress.points < POINTS_TO_REFILL) {
    throw new Error('Not enough points')
  }

  await db.update(userProgress).set({
    hearts: 5,
    points: currentUserProgress.points - POINTS_TO_REFILL
  })
  .where(
    eq(userProgress.userId, currentUserProgress.userId)
  )
  
  revalidatePath('/learn')
  revalidatePath('/lesson')
  revalidatePath('/quests')
  revalidatePath('/leaderboard')
}