"use server"

import db from '@/db/drizzle'
import { getCourseById, getUserProgress } from '@/db/queries'
import { userProgress } from '@/db/schema'
import { auth, currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const upsertUserProgress = async(couseId: number) => {
  const { userId } = auth()
  const user = await currentUser()

  if (!user || !userId) throw new Error('Unauthorized')

  const course = await getCourseById(couseId)
  if (!course) throw new Error('Course not found')
  
  // if (!course.units.length || !course.units[0].lessons.length) {
  //   throw new Error('Course id empty')
  // }

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