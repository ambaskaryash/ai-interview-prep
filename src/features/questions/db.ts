import { db } from "@/drizzle/db"
import { QuestionTable } from "@/drizzle/schema"
import { revalidateQuestionCache } from "./dbCache"
import { eq } from "drizzle-orm"

export async function insertQuestion(
  question: typeof QuestionTable.$inferInsert
) {
  const [newQuestion] = await db
    .insert(QuestionTable)
    .values(question)
    .returning({
      id: QuestionTable.id,
      jobInfoId: QuestionTable.jobInfoId,
    })

  revalidateQuestionCache({
    id: newQuestion.id,
    jobInfoId: newQuestion.jobInfoId,
  })

  return newQuestion
}

export async function updateQuestion(
  id: string,
  data: Partial<typeof QuestionTable.$inferInsert>
) {
  const [updatedQuestion] = await db
    .update(QuestionTable)
    .set(data)
    .where(eq(QuestionTable.id, id))
    .returning({
      id: QuestionTable.id,
      jobInfoId: QuestionTable.jobInfoId,
    })

  if (updatedQuestion) {
    revalidateQuestionCache({
      id: updatedQuestion.id,
      jobInfoId: updatedQuestion.jobInfoId,
    })
  }

  return updatedQuestion
}
