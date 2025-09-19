import { db } from "@/drizzle/db"
import {
  JobInfoTable,
  questionDifficulties,
  QuestionTable,
} from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { insertQuestion } from "@/features/questions/db"
import { getQuestionJobInfoTag } from "@/features/questions/dbCache"
import { canCreateQuestion } from "@/features/questions/permissions"
import { PLAN_LIMIT_MESSAGE } from "@/lib/errorToast"
import { generateAiQuestion } from "@/services/ai/questions"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import type { StreamTextResult } from "ai"
import { and, asc, eq } from "drizzle-orm"
import { unstable_cache as cache } from "next/cache"
import z from "zod"

const schema = z.object({
  prompt: z.enum(questionDifficulties),
  jobInfoId: z.string().min(1),
})

export async function POST(req: Request) {
  const body = await req.json()
  const result = schema.safeParse(body)

  if (!result.success) {
    return new Response("Error generating your question", { status: 400 })
  }

  const { prompt: difficulty, jobInfoId } = result.data
  const { userId } = await getCurrentUser()

  if (userId == null) {
    return new Response("You are not logged in", { status: 401 })
  }

  if (!(await canCreateQuestion())) {
    return new Response(PLAN_LIMIT_MESSAGE, { status: 403 })
  }

  const jobInfo = await (await getJobInfo(jobInfoId, userId))()
  if (jobInfo == null) {
    return new Response("You do not have permission to do this", {
      status: 403,
    })
  }

  const previousQuestions = await (await getQuestions(jobInfoId))()

  let res: StreamTextResult<any, any>

  res = generateAiQuestion({
    previousQuestions,
    jobInfo,
    difficulty,
    onFinish: async question => {
      const { id } = await insertQuestion({
        text: question,
        jobInfoId,
        difficulty,
      })

      // This is a hack to get the questionId to the client.
      // The AI SDK doesn't have a clean way to do this.
      // res.experimental_streamData = true // Removed as it's not a valid property
      // res.appendData({ questionId: id }) // Removed as it's not a valid property
    },
  })
  return res.toTextStreamResponse()
}

async function getQuestions(jobInfoId: string) {
  return cache(
    async () => {
      return db.query.QuestionTable.findMany({
        where: eq(QuestionTable.jobInfoId, jobInfoId),
        orderBy: asc(QuestionTable.createdAt),
      })
    },
    [`getQuestions-${jobInfoId}`],
    {
      tags: [getQuestionJobInfoTag(jobInfoId)],
    },
  )
}

async function getJobInfo(id: string, userId: string) {
  return cache(
    async () => {
      return db.query.JobInfoTable.findFirst({
        where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
      })
    },
    [`getJobInfo-${id}-${userId}`],
    {
      tags: [getJobInfoIdTag(id)],
    },
  )
}
