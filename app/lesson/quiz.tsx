"use client"

import Image from "next/image"
import Confetti from "react-confetti"
import { toast } from "sonner"
import { useAudio, useMount, useWindowSize } from "react-use"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { Header } from "./header"
import { Footer } from "./footer"
import { Challenge } from "./challenge"
import { ResultCard } from "./result-card"
import { reduceHearts } from "@/actions/user-progress"
import { QuestionBubble } from "./question-bubble"
import { useHeartsModal } from "@/store/use-hearts-modal"
import { usePracticeModal } from "@/store/use-practice-modal"
import { upsertChallengeProgress } from "@/actions/challenge-progress"
import { challengeOptions, challenges, userSubscription } from "@/db/schema"

type Props = {
  initialPercentage:        number
  initialHearts:            number
  initialLessonId:          number
  initialLessonChallenges:  (typeof challenges.$inferSelect & {
    completed: boolean
    challengeOptions: typeof challengeOptions.$inferSelect[]
  })[]
  userSubcription:          typeof userSubscription.$inferSelect & {
    isActive: boolean
  } | null
}

export const Quiz = ({ initialPercentage, initialHearts, initialLessonId, initialLessonChallenges, userSubcription }: Props) => {
  const { open: openHeartsModal } = useHeartsModal()
  const { open: openPracticeModal } = usePracticeModal()

  useMount(() => {
    if (initialPercentage === 100) openPracticeModal()
  })

  const router = useRouter()
  const { width, height } = useWindowSize()

  const [finishAudio] = useAudio({ src: "/finish.wav", autoPlay: true })
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" })
  const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" })
  const [pending, startTransition] = useTransition()

  const [lessonId] = useState(initialLessonId)
  const [hearts, setHearts] = useState(initialHearts)
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage
  })
  const [challenges] = useState(initialLessonChallenges)
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge: any) => !challenge.completed)

    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })
  const [selectedOption, setSelectedOption] = useState<number>()
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

  const challenge = challenges[activeIndex]
  const options = challenge?.challengeOptions ?? []

  const onNext = () => {
    setActiveIndex((current) => current + 1)
  }

  const onSelect = (id: number) => {
    if (status !== "none") return

    setSelectedOption(id)
  }

  const onContinue = () => {
    if (!selectedOption) return

    if (status === "wrong") {
      setStatus("none")
      setSelectedOption(undefined)
      return
    }
    
    if (status === "correct") {
      onNext()
      setStatus("none")
      setSelectedOption(undefined)
      return
    }

    const correctOption = options.find((option) => option.correct)
    if (!correctOption) return
    // if (correctOption && correctOption.id === selectedOption) {
    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((resp) => {
            if (resp?.error === "hearts") {
              openHeartsModal()
              return
            }

            correctControls.play()
            setStatus("correct")
            setPercentage((prev) => prev + 100 / challenges.length)

            //this is practice
            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5))
            }
          })
          .catch(() => toast.error("Something went wrong"))
      })
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then((resp) => {
            if (resp?.error === "hearts") {
              openHeartsModal()
              return
            }

            incorrectControls.play()
            setStatus("wrong")

            if (!resp?.error) {
              setHearts((prev) => Math.max(prev - 1, 0))
            }
          })
          .catch(() => toast.error("Something went wrong"))
      })      
    }
  }

  // TODO: remove true
  if (!challenge) {
    return (
      <>
        {finishAudio}

        <Confetti 
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10000}
        />

        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image 
            src='/finish.png'
            alt="finish"
            className="hidden lg:block"
            height={200}
            width={200}
          />
          
          <Image 
            src='/finish.png'
            alt="finish"
            className="block lg:hidden"
            height={100}
            width={100}
          />

          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! 
            <br />
            You&apos;ve completed the lesson
          </h1>

          <div className="flex items-center gap-x-4 w-full">
            <ResultCard 
              variant="points"
              value={challenges.length * 10}
            />
            
            <ResultCard 
              variant="hearts"
              value={hearts}
            />
          </div>
        </div>

        <Footer 
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push('/learn')}
        />
      </>
    )
  }

  const title = challenge.type === "ASSIST"
    ? "Select the correct meaning"
    : challenge.question

  return (
    <>
      {incorrectAudio}

      {correctAudio}

      <Header 
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubcription?.isActive}
      />

      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 gap-y-12">
            <h1 className="lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>

            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question}/>
              )}

              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectdOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />              
            </div>
          </div>
        </div>
      </div>

      <Footer 
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      />
    </>
  )
}
