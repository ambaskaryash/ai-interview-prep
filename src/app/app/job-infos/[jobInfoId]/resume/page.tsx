import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink"
import { ResumePageClient } from "./_client"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { notFound } from "next/navigation"
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"

export default async function ResumePage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>
}) {
  const { jobInfoId } = await params
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (userId == null) return redirectToSignIn()

  const jobInfo = await getJobInfo(jobInfoId, userId)
  if (jobInfo == null) return notFound()

  return (
    <div className="container py-4 space-y-4 h-screen-header flex flex-col items-start">
      <JobInfoBackLink jobInfoId={jobInfoId} />
      <ResumePageClient 
        jobInfoId={jobInfoId} 
        initialCoverLetter={jobInfo.coverLetter}
      />
    </div>
  )
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
