"use client"

import { challengeOptions, challenges } from "@/db/schema"
import { useState } from "react"
import { Header } from "./header"

type Props = {
  initialPercentage:        number
  initialHearts:            number
  initialLessonId:          number
  initialLessonChallenges:  (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: typeof challengeOptions.$inferSelect[]
  })[]
  userSubcription:          any //TODO: replace with DB schema
}

export const Quiz = ({ initialLessonId, initialLessonChallenges, initialHearts, initialPercentage, userSubcription}) => {
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(initialPercentage)

  return (
    <>
      <Header 
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubcription?.isActive}
      />
    </>
  )
}
