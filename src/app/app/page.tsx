import { 
  Box, 
  Container, 
  VStack, 
  Spinner, 
  Card,
  CardBody,
  Heading,
  Text
} from '@chakra-ui/react'
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm"
import { getJobInfoUserTag } from "@/features/jobInfos/dbCache"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { desc, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { Suspense } from "react"
import { JobInfosGrid } from "./_components/JobInfosGrid"
import { DashboardHeader } from "./_components/DashboardHeader"

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <Box height="calc(100vh - 4rem)" display="flex" alignItems="center" justifyContent="center">
          <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        </Box>
      }
    >
      <JobInfos />
    </Suspense>
  )
}

async function JobInfos() {
  const { userId, redirectToSignIn } = await getCurrentUser()
  if (userId == null) return redirectToSignIn()

  const jobInfos = await getJobInfos(userId)

  if (jobInfos.length === 0) {
    return <NoJobInfos />
  }

  return (
    <Container maxW="6xl" px={{ base: 4, md: 6 }}>
      <VStack spacing={8} align="stretch">
        <DashboardHeader />
        <JobInfosGrid jobInfos={jobInfos} />
      </VStack>
    </Container>
  )
}

function NoJobInfos() {
  return (
    <Container maxW="4xl" px={{ base: 4, md: 6 }}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={4} textAlign="center">
          <Heading 
            as="h1" 
            size={{ base: 'xl', md: '2xl' }}
            color="gray.800"
            _dark={{ color: 'white' }}
          >
            Welcome to EvoInterview
          </Heading>
          <Text 
            color="gray.600" 
            _dark={{ color: 'gray.300' }}
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight="1.7"
            maxW="2xl"
          >
            To get started, enter information about the type of job you are wanting
            to apply for. This can be specific information copied directly from a
            job listing or general information such as the tech stack you want to
            work in. The more specific you are in the description the closer the
            test interviews will be to the real thing.
          </Text>
        </VStack>
        
        <Card variant="elevated" p={2}>
          <CardBody>
            <JobInfoForm />
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

async function getJobInfos(userId: string) {
  "use cache"
  cacheTag(getJobInfoUserTag(userId))

  return db.query.JobInfoTable.findMany({
    where: eq(JobInfoTable.userId, userId),
    orderBy: desc(JobInfoTable.updatedAt),
  })
}
