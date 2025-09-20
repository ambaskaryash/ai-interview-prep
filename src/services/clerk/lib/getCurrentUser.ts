import { auth } from "@clerk/nextjs/server"
import { getUser } from "./cached-queries"

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, redirectToSignIn } = await auth()

  return {
    userId,
    redirectToSignIn,
    user: allData && userId != null ? await getUser(userId) : undefined,
  }
}

