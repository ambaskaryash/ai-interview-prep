"use cache"

import { db } from "@/drizzle/db"
import { UserTable, InterviewTable } from "@/drizzle/schema"
import { getUserIdTag } from "@/features/users/dbCache"
import { getInterviewIdTag } from "@/features/interviews/dbCache"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"

export async function getUser(id: string) {
  cacheTag(getUserIdTag(id))

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  })
}

export async function getInterview(id: string, userId: string) {
  cacheTag(getInterviewIdTag(id))

  const interview = await db.query.InterviewTable.findFirst({
    where: eq(InterviewTable.id, id),
    with: {
      jobInfo: {
        columns: {
          id: true,
          userId: true,
        },
      },
    },
  })

  if (interview == null) return null

  cacheTag(getJobInfoIdTag(interview.jobInfo.id))
  if (interview.jobInfo.userId !== userId) return null

  return interview
}
