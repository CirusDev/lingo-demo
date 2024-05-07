import { auth } from "@clerk/nextjs/server";

const ALLOWED_IDS = process.env.CLERK_ALLOWED_IDS

export const getIsAdmin = () => {
  const { userId } = auth()

  if (!userId) return false

  return ALLOWED_IDS === userId
}