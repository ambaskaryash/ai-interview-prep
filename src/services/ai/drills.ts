import { JobInfoTable } from "@/drizzle/schema"
import { groq } from "./models/groq"
import { streamText } from "ai"

export async function generateDrillQuestion(
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "description" | "experienceLevel"
  >
) {
  return streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: `You are an expert interviewer.
Generate ONE challenging interview question for this job.
Job Title: ${jobInfo.title}
Level: ${jobInfo.experienceLevel}
Description: ${jobInfo.description}

Mix behavioral and technical questions.
Return ONLY the question text.`,
    messages: [{ role: "user", content: "Ask me a question." }],
  })
}

export async function generateDrillFeedback({
  question,
  answer,
  jobInfo,
}: {
  question: string
  answer: string
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "description" | "experienceLevel"
  >
}) {
  return streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: `You are an expert interview coach.
The candidate is practicing "Answer Drills".

Job: ${jobInfo.title}
Question: "${question}"
Candidate Answer: "${answer}"

Provide feedback in Markdown:
1. **STAR Method Check**: Did they use Situation, Task, Action, Result?
2. **Strengths**: What was good?
3. **Improvements**: Specific ways to make it better.
4. **Better Example**: A brief example of how a top candidate might answer this.`,
    messages: [{ role: "user", content: "Critique my answer." }],
  })
}
