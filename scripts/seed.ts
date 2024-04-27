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

    await db.insert(schema.courses).values([
      {
        id:       1,
        title:    "Spanish",
        imageSrc:   "/es.png"
      },
      {
        id:       2,
        title:    "Italian",
        imageSrc:   "/it.png"      
      },
      {
        id:       3,
        title:    "French",
        imageSrc:   "/fr.png"
      },
      {
        id:       4,
        title:    "English",
        imageSrc:   "/us.png"
      }
    ])

    console.log("🍏 Seeding finished");
    
  } catch (error) {
    console.log("🔴  error: ", error);
    throw new Error("Failed to seed DB")    
  }
}

main()