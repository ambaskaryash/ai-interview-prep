import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink"
import { canRunResumeAnalysis } from "@/features/resumeAnalyses/permissions"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Container, VStack, Spinner, Box } from "@chakra-ui/react"
import { ResumePageClient } from "./_client"

export default async function ResumePage({
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
          <SuspendedComponent jobInfoId={jobInfoId} />
        </Suspense>
      </VStack>
    </Container>
  )
}

async function SuspendedComponent({ jobInfoId }: { jobInfoId: string }) {
  if (!(await canRunResumeAnalysis())) return redirect("/app/upgrade")

  return <ResumePageClient jobInfoId={jobInfoId} />
}
