import { BackLink } from "@/components/BackLink"
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { notFound } from "next/navigation"
import { PreparationPageClient } from "./_client"
import { Suspense } from "react"
import { Loader2Icon } from "lucide-react"

export default async function PreparationPage({
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
    <div className="container my-4 space-y-4">
      <BackLink href={`/app/job-infos/${jobInfoId}`}>Dashboard</BackLink>
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl">Interview Preparation</h1>
        <p className="text-muted-foreground">
          Preparation for {jobInfo.title || "Job Application"}
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-64 flex items-center justify-center">
            <Loader2Icon className="animate-spin size-8 text-muted-foreground" />
          </div>
        }
      >
        <PreparationPageClient 
          jobInfoId={jobInfoId} 
          initialStudyPlan={jobInfo.studyPlan}
          initialCheatsheet={jobInfo.cheatsheet}
        />
      </Suspense>
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
