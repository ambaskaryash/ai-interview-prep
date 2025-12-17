"use server"

import { db } from "@/drizzle/db"
import { QuestionTable } from "@/drizzle/schema"
import { eq, desc } from "drizzle-orm"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"

export async function getLatestQuestionId(jobInfoId: string) {
  const { userId } = await getCurrentUser()
  if (!userId) return null

  const question = await db.query.QuestionTable.findFirst({
    where: eq(QuestionTable.jobInfoId, jobInfoId),
    orderBy: desc(QuestionTable.createdAt),
    columns: { id: true },
  })

  return question?.id ?? null
}
