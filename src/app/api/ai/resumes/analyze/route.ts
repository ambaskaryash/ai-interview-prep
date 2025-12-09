import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { canRunResumeAnalysis } from "@/features/resumeAnalyses/permissions"
// Plan limit import removed - app is now free to use
import { analyzeResumeForJob } from "@/services/ai/resumes/ai"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"

export async function POST(req: Request) {
  const { userId } = await getCurrentUser()

  const formData = await req.formData()
  const resumeFile = formData.get("resumeFile") as File
  const jobInfoId = formData.get("jobInfoId") as string | null

  if (!resumeFile) {
    return new Response("Invalid request", { status: 400 })
  }

  if (resumeFile.size > 10 * 1024 * 1024) {
    return new Response("File size exceeds 10MB limit", { status: 400 })
  }

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ]

  if (!allowedTypes.includes(resumeFile.type)) {
    return new Response("Please upload a PDF, Word document, or text file", {
      status: 400,
    })
  }

  let jobInfo:
    | Pick<typeof JobInfoTable.$inferSelect, "title" | "experienceLevel" | "description">
    | null = null

  if (userId != null && jobInfoId != null) {
    jobInfo = (await getJobInfo(jobInfoId, userId)) ?? null
  }

  const effectiveJobInfo =
    jobInfo ?? {
      title: "",
      experienceLevel: "mid-level",
      description: "",
    }

  // Permission check removed - app is now free to use
  // Since canRunResumeAnalysis() now always returns true, we skip this check

  const res = await analyzeResumeForJob({
    resumeFile,
    jobInfo: effectiveJobInfo,
  })

  return res.toTextStreamResponse()
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
