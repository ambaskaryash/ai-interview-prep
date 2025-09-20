import { db } from "@/drizzle/db"
import { InterviewTable } from "@/drizzle/schema"
import { getInterviewJobInfoTag } from "@/features/interviews/dbCache"
import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, desc, eq, isNotNull } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Container, VStack, Spinner, Box } from "@chakra-ui/react"
import { InterviewsGrid, InterviewsHeader } from "./_components/InterviewsGrid"

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>
}) {
  const { jobInfoId } = await params

  return (
    <Container maxW="6xl" px={{ base: 4, md: 6 }}>
      <VStack spacing={6} align="stretch" py={4}>
        <JobInfoBackLink jobInfoId={jobInfoId} />

        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" alignItems="center" py={12}>
              <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
            </Box>
          }
        >
          <SuspendedPage jobInfoId={jobInfoId} />
        </Suspense>
      </VStack>
    </Container>
  )
}

async function SuspendedPage({ jobInfoId }: { jobInfoId: string }) {
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (userId == null) return redirectToSignIn()

  const interviews = await getInterviews(jobInfoId, userId)
  if (interviews.length === 0) {
    return redirect(`/app/job-infos/${jobInfoId}/interviews/new`)
  }
  return (
    <VStack spacing={8} align="stretch" w="full">
      <InterviewsHeader jobInfoId={jobInfoId} />
      <InterviewsGrid interviews={interviews} jobInfoId={jobInfoId} />
    </VStack>
  )
}

async function getInterviews(jobInfoId: string, userId: string) {
  "use cache"
  cacheTag(getInterviewJobInfoTag(jobInfoId))
  cacheTag(getJobInfoIdTag(jobInfoId))

  const data = await db.query.InterviewTable.findMany({
    where: and(
      eq(InterviewTable.jobInfoId, jobInfoId),
      isNotNull(InterviewTable.humeChatId)
    ),
    with: { jobInfo: { columns: { userId: true } } },
    orderBy: desc(InterviewTable.updatedAt),
  })

  return data.filter(interview => interview.jobInfo.userId === userId)
}
