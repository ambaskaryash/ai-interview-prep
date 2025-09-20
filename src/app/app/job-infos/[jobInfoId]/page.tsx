import { BackLink } from "@/components/BackLink"
import { Skeleton } from "@/components/Skeleton"
import { SuspendedItem } from "@/components/SuspendedItem"
import { 
  Badge,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Box
} from "@chakra-ui/react"
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { formatExperienceLevel } from "@/features/jobInfos/lib/formatters"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { notFound } from "next/navigation"
import { OptionsGrid } from "./_components/OptionsGrid"


export default async function JobInfoPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>
}) {
  const { jobInfoId } = await params

  const jobInfo = getCurrentUser().then(
    async ({ userId, redirectToSignIn }) => {
      if (userId == null) return redirectToSignIn()

      const jobInfo = await getJobInfo(jobInfoId, userId)
      if (jobInfo == null) return notFound()

      return jobInfo
    }
  )

  return (
    <Container maxW="6xl" px={{ base: 4, md: 6 }}>
      <VStack spacing={8} align="stretch">
        <BackLink href="/app">Dashboard</BackLink>

        <VStack spacing={6} align="stretch">
          <Box as="header">
            <VStack align="start" spacing={4}>
              <VStack align="start" spacing={2}>
                <Heading 
                  as="h1" 
                  size={{ base: 'xl', md: '2xl' }}
                  color="gray.800"
                  _dark={{ color: 'white' }}
                >
                  <SuspendedItem
                    item={jobInfo}
                    fallback={<Skeleton className="w-48 h-8" />}
                    result={j => j.name}
                  />
                </Heading>
                <HStack spacing={2} flexWrap="wrap">
                  <SuspendedItem
                    item={jobInfo}
                    fallback={<Skeleton className="w-12 h-6" />}
                    result={j => (
                      <Badge colorScheme="purple" variant="subtle">
                        {formatExperienceLevel(j.experienceLevel)}
                      </Badge>
                    )}
                  />
                  <SuspendedItem
                    item={jobInfo}
                    fallback={null}
                    result={j => {
                      return j.title && (
                        <Badge colorScheme="blue" variant="subtle">
                          {j.title}
                        </Badge>
                      )
                    }}
                  />
                </HStack>
              </VStack>
              <Text 
                color="gray.600" 
                _dark={{ color: 'gray.300' }}
                fontSize={{ base: 'md', md: 'lg' }}
                noOfLines={3}
                lineHeight="1.7"
              >
                <SuspendedItem
                  item={jobInfo}
                  fallback={<Skeleton className="w-96 h-6" />}
                  result={j => j.description}
                />
              </Text>
            </VStack>
          </Box>

          <OptionsGrid jobInfoId={jobInfoId} />
        </VStack>
      </VStack>
    </Container>
  )
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
