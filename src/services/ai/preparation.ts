import { JobInfoTable } from "@/drizzle/schema"
import { groq } from "./models/groq"
import { streamText } from "ai"

export async function generateStudyPlan(
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "description" | "experienceLevel"
  >
) {
  return streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: `You are an expert technical interview coach.
Create a structured 3-day study plan for this job application.

Job Details:
Title: ${jobInfo.title || "Not specified"}
Level: ${jobInfo.experienceLevel}
Description:
${jobInfo.description}

Format the output in Markdown.
Structure it clearly:
# 3-Day Study Plan

## Day 1: [Theme]
- Topic 1: [Details]
- Topic 2: [Details]

## Day 2: [Theme]
...

## Day 3: [Theme]
...

Focus on the most critical skills and concepts mentioned or implied in the job description.`,
    messages: [{ role: "user", content: "Generate my study plan." }],
  })
}

export async function generateCheatsheet(
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "description" | "experienceLevel"
  >
) {
  return streamText({
    model: groq("llama-3.3-70b-versatile"),
    system: `You are an expert technical interview coach.
Create a "Day of Interview" Cheatsheet for this job application.

Job Details:
Title: ${jobInfo.title || "Not specified"}
Level: ${jobInfo.experienceLevel}
Description:
${jobInfo.description}

Format the output in Markdown.
Include these sections:
1. **Key Technical Concepts**: 5-7 bullet points of "must-know" topics to refresh.
2. **Behavioral Focus**: What soft skills/values does this company likely value?
3. **Questions to Ask**: 3 smart, strategic questions to ask the interviewer.
4. **Quick Tips**: 3 rapid-fire tips for this specific role type.`,
    messages: [{ role: "user", content: "Generate my cheatsheet." }],
  })
}
