import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { generateDrillFeedback } from "@/services/ai/drills"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"

export async function POST(req: Request) {
  const { userId } = await getCurrentUser()

  if (userId == null) {
    return new Response("You are not logged in", { status: 401 })
  }

  const { jobInfoId, question, answer } = await req.json()

  if (!jobInfoId || !question || !answer) {
    return new Response("Invalid request", { status: 400 })
  }

  const jobInfo = await getJobInfo(jobInfoId, userId)
  if (jobInfo == null) {
    return new Response("You do not have permission to do this", {
      status: 403,
    })
  }

  const res = await generateDrillFeedback({ question, answer, jobInfo })

  return res.toTextStreamResponse()
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
