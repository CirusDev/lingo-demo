import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

const main = async() => {
  try {
    console.log("🔵  Seeding")  
    await db.delete(schema.courses)
    await db.delete(schema.userProgress)
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)
    await db.delete(schema.userSubscription)

    await db.insert(schema.courses).values([
      {
        // id:       1,
        title:    "Spanish",
        imageSrc:   "/es.png"
      },
      {
        // id:       2,
        title:    "Italian",
        imageSrc:   "/it.png"      
      },
      {
        // id:       3,
        title:    "French",
        imageSrc:   "/fr.png"
      },
      {
        // id:       4,
        title:    "English",
        imageSrc:   "/us.png"
      }
    ])

    console.log("🍏 Seeding finished");
    
  } catch (error) {
    console.log("🔴  error: ", error);
    throw new Error("Failed to seed DB")    
  }

  await db.insert(schema.units).values([
    {
      // id:           1,
      title:        "Unit 1",
      courseId:     1,
      description:  "learn basics or Spanish",
      order:        1
    }
  ])

  await db.insert(schema.lessons).values([
    {
      // id:           1,
      unitId:       1,
      order:        1,
      title:        "Nouns"
    },
    {
      // id:           2,
      unitId:       1,
      order:        2,
      title:        "Verbs"
    },
    {
      // id:           3,
      unitId:       1,
      order:        3,
      title:        "Coulor"
    },
    {
      // id:           4,
      unitId:       1,
      order:        4,
      title:        "Places"
    },
    {
      // id:           5,
      unitId:       1,
      order:        5,
      title:        "Places"
    }
  ])

  await db.insert(schema.challenges).values([
    {
      // id:           1,
      lessonId:     1, //from lesson NOUS
      type:         "SELECT",
      order:        1,
      question:     'Which one of these is the "the Man"?'
    },
    {
      // id:           2,
      lessonId:     1, //from lesson NOUS
      type:         "ASSIST",
      order:        2,
      question:     '"the Man"'
    },
    {
      // id:           3,
      lessonId:     1, //from lesson NOUS
      type:         "SELECT",
      order:        3,
      question:     'Which one of these is the "the robot"?'
    }
  ])

  await db.insert(schema.challengeOptions).values([
    {
      // id:           1,
      challengeId:  1, //from challenge 1 "The Man ?"
      imageSrc:     "/man.png",
      correct:      true,
      text:         "el hombre",
      audioSrc:     "/es_man.mp3"
    },
    {
      // id:           2,
      challengeId:  1, //from challenge 1 "The Man ?"
      imageSrc:     "/woman.png",
      correct:      false,
      text:         "la mujer",
      audioSrc:     "/es_woman.mp3"
    },
    {
      // id:           3,
      challengeId:  1, //from challenge 1 "The Man ?"
      imageSrc:     "/robot.png",
      correct:      false,
      text:         "el robot",
      audioSrc:     "/es_robot.mp3"
    }
  ])

  await db.insert(schema.challengeOptions).values([
    {
      // id:           4,
      challengeId:  2, //from challenge 1 "The Man ?"
      correct:      true,
      text:         "el hombre",
      audioSrc:     "/es_man.mp3"
    },
    {
      // id:           5,
      challengeId:  2, //from challenge 1 "The Man ?"
      correct:      false,
      text:         "la mujer",
      audioSrc:     "/es_woman.mp3"
    },
    {
      // id:           6,
      challengeId:  2, //from challenge 1 "The Man ?"
      correct:      false,
      text:         "el robot",
      audioSrc:     "/es_robot.mp3"
    }  
  ])

  await db.insert(schema.challengeOptions).values([
    {
      // id:           7,
      challengeId:  3, //from challenge 1 "The Man ?"
      imageSrc:     "/man.png",
      correct:      false,
      text:         "el hombre",
      audioSrc:     "/es_man.mp3"
    },
    {
      // id:           8,
      challengeId:  3, //from challenge 1 "The Man ?"
      imageSrc:     "/woman.png",
      correct:      false,
      text:         "la mujer",
      audioSrc:     "/es_woman.mp3"
    },
    {
      // id:           9,
      challengeId:  3, //from challenge 1 "The Man ?"
      imageSrc:     "/robot.png",
      correct:      true,
      text:         "el robot",
      audioSrc:     "/es_robot.mp3"
    }
  ])

  await db.insert(schema.challenges).values([
    {
      // id:           4,
      lessonId:     2, //from lesson NOUS
      type:         "SELECT",
      order:        1,
      question:     'Which one of these is the "the Man"?'
    },
    {
      // id:           5,
      lessonId:     2, //from lesson NOUS
      type:         "ASSIST",
      order:        2,
      question:     '"the Man"'
    },
    {
      // id:           6,
      lessonId:     2, //from lesson NOUS
      type:         "SELECT",
      order:        3,
      question:     'Which one of these is the "the robot"?'
    }
  ])

}
main()