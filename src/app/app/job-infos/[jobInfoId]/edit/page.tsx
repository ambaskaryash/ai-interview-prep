import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { JobInfoBackLink } from "@/features/jobInfos/components/JobInfoBackLink"
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { 
  Container, 
  VStack, 
  Heading,
  Text,
  Card,
  CardBody,
  Spinner,
  Box
} from "@chakra-ui/react"

export default async function JobInfoNewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>
}) {
  const { jobInfoId } = await params

  return (
    <Container maxW="4xl" px={{ base: 4, md: 6 }}>
      <VStack spacing={8} align="stretch" py={4}>
        <JobInfoBackLink jobInfoId={jobInfoId} />

        <Heading 
          as="h1" 
          size={{ base: 'xl', md: '2xl' }}
          color="gray.800"
          _dark={{ color: 'white' }}
        >
          Edit Job Description
        </Heading>

        <Card 
          variant="elevated" 
          bg="white" 
          _dark={{ bg: 'gray.700' }}
          boxShadow="xl"
          borderRadius="xl"
          p={6}
        >
          <CardBody p={0}>
            <Suspense
              fallback={
                <Box display="flex" justifyContent="center" alignItems="center" py={16}>
                  <VStack spacing={4}>
                    <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
                    <Text color="gray.500" fontSize="sm">Loading job information...</Text>
                  </VStack>
                </Box>
              }
            >
              <SuspendedForm jobInfoId={jobInfoId} />
            </Suspense>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

async function SuspendedForm({ jobInfoId }: { jobInfoId: string }) {
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (userId == null) return redirectToSignIn()

  const jobInfo = await getJobInfo(jobInfoId, userId)
  if (jobInfo == null) return notFound()

  return <JobInfoForm jobInfo={jobInfo} />
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
