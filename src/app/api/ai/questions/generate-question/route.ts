import { db } from "@/drizzle/db"
import {
  JobInfoTable,
  questionDifficulties,
  QuestionTable,
} from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { insertQuestion } from "@/features/questions/db"
import { getQuestionJobInfoTag } from "@/features/questions/dbCache"

import { generateAiQuestion } from "@/services/ai/questions"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, asc, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import z from "zod"

const schema = z.object({
  prompt: z.enum(questionDifficulties),
  jobInfoId: z.string().min(1),
})

export async function POST(req: Request) {
  console.log("[ai] Received generate-question request")
  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    console.error("[ai] Schema validation failed:", result.error)
    return new Response("Error generating your question", { status: 400 })
  }

  const { prompt: difficulty, jobInfoId } = result.data
  console.log(`[ai] Generating question for jobInfoId: ${jobInfoId}, difficulty: ${difficulty}`)
  const { userId } = await getCurrentUser()

  if (userId == null) {
    console.error("[ai] User not logged in")
    return new Response("You are not logged in", { status: 401 })
  }

  // Permission check removed - app is now free to use

  const jobInfo = await getJobInfo(jobInfoId, userId)
  if (jobInfo == null) {
    console.error(`[ai] Job info not found or permission denied for user: ${userId}`)
    return new Response("You do not have permission to do this", {
      status: 403,
    })
  }
  console.log("[ai] Job info retrieved successfully")

  const previousQuestions = await getQuestions(jobInfoId)
  console.log(`[ai] Retrieved ${previousQuestions.length} previous questions`)

  // Generate the AI question and save it to the database when finished
  try {
    console.log("[ai] Calling generateAiQuestion...")
    const res = generateAiQuestion({
      previousQuestions,
      jobInfo,
      difficulty,
      onFinish: async question => {
        console.log(`[ai] Generation finished. Text length: ${question.length}`)
        try {
          const { id } = await insertQuestion({
            text: question,
            jobInfoId,
            difficulty,
          })
          console.log(`[ai] Question generated and saved with ID: ${id}`)
        } catch (error) {
          console.error("[ai] Failed to save question to DB:", error)
        }
      },
    })

    console.log("[ai] Stream created, returning response")
    // Stream the AI-generated question to the client
    return res.toTextStreamResponse()
  } catch (error) {
    console.error("[ai] Error generating question stream:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

async function getQuestions(jobInfoId: string) {
  "use cache"
  cacheTag(getQuestionJobInfoTag(jobInfoId))

  return db.query.QuestionTable.findMany({
    where: eq(QuestionTable.jobInfoId, jobInfoId),
    orderBy: asc(QuestionTable.createdAt),
  })
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
