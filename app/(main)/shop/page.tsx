import Image from "next/image"
import { redirect } from "next/navigation"

import { Items } from "./items"
import { FeedWrapper } from "@/components/feed-wrapper"
import { UserProgress } from "@/components/user-progress"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { getUserProgress, getUserSubscription } from "@/db/queries"
import { Quests } from "@/components/quests"

const ShopPage = async() => {
  const userProgressData = getUserProgress()
  const userSubscriptionData = getUserSubscription()

  const [
    userProgress,
    userSubscription
  ] = await Promise.all([
    userProgressData,
    userSubscriptionData
  ])
  
  if (!userProgress || !userProgress.activeCourse) redirect("/courses")

  const isPro = !!userSubscription?.isActive

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress 
          activeCoure={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />

        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image 
            src={'/store.png'}
            alt="Shop"
            height={100}
            width={100}
          />

          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>

          <p className="text-muted-foreground text-center text-lg mb-6">
            Exchange your points on cool stuff
          </p>
          
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>      
    </div>
  )
}

export default ShopPage