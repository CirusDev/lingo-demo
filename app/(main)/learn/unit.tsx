import { lessons, units } from "@/db/schema"

type Props = {
  id:                     number
  order:                  number
  description:            string
  title:                  string
  lessons:                (typeof lessons.$inferSelect & {
                            completed: boolean
                          })[]
  activeLesson:           typeof lessons.$inferSelect & {
                            unit: typeof units.$inferSelect
                          } | undefined
  activeLessonPercentage: number
}

import React from 'react'
import { UnitBanner } from "./unit-banner"
import { LessonButton } from "./lesson-button"

export const Unit = ({id, order, description, title, lessons, activeLesson, activeLessonPercentage}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description}/>

      <div className="flex flex-col items-center relative">
        {lessons.map((lesson, idx) => {
          const isCurrent = lesson.id === activeLesson?.id //remove later
          const isLocked = !lesson.completed && !isCurrent

          return (
            <LessonButton
              key={idx}
              id={id}
              index={idx}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          )
        })}

      </div>
    </>
  )
}
