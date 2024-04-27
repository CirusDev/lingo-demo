import { eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { cache } from 'react'

import db from './drizzle'
import { userProgress } from './schema'

export const getUserProgress = cache(async () => {
  const { userId } = auth()

  if (!userId) return null

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true
    }
  })

  return data
})

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany()

  return data
})

