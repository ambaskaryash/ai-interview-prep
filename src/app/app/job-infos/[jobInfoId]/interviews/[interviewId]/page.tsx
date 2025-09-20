import { BackLink } from "@/components/BackLink"
import { Skeleton, SkeletonButton } from "@/components/Skeleton"
import { SuspendedItem } from "@/components/SuspendedItem"
import { 
  Container,
  VStack,
  HStack,
  Flex,
  Heading,
  Text,
  Button,
  Spinner,
  Box,
  useDisclosure
} from "@chakra-ui/react"
import { db } from "@/drizzle/db"
import { InterviewTable } from "@/drizzle/schema"
import { getInterviewIdTag } from "@/features/interviews/dbCache"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { formatDateTime } from "@/lib/formatters"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { eq } from "drizzle-orm"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import { notFound } from "next/navigation"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { Suspense } from "react"
import { CondensedMessages } from "@/services/hume/components/CondensedMessages"
import { condenseChatMessages } from "@/services/hume/lib/condenseChatMessages"
import { fetchChatMessages } from "@/services/hume/lib/api"
import { ActionButton } from "@/components/ui/action-button"
import { generateInterviewFeedback } from "@/features/interviews/actions"
import { FeedbackModal } from "./_components/FeedbackModal"

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string; interviewId: string }>
}) {
  const { jobInfoId, interviewId } = await params

  const interview = getCurrentUser().then(
    async ({ userId, redirectToSignIn }) => {
      if (userId == null) return redirectToSignIn()

      const interview = await getInterview(interviewId, userId)
      if (interview == null) return notFound()
      return interview
    }
  )

  return (
    <Container maxW="6xl" px={{ base: 4, md: 6 }}>
      <VStack spacing={8} align="stretch" py={4}>
        <BackLink href={`/app/job-infos/${jobInfoId}/interviews`}>
          All Interviews
        </BackLink>
        
        <VStack spacing={6} align="stretch">
          <Flex 
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'start', md: 'center' }}
            justify="space-between"
            gap={4}
          >
            <VStack align="start" spacing={2}>
              <Heading 
                as="h1" 
                size={{ base: 'xl', md: '2xl' }}
                color="gray.800"
                _dark={{ color: 'white' }}
              >
                Interview: {" "}
                <SuspendedItem
                  item={interview}
                  fallback={<Skeleton className="w-48" />}
                  result={i => formatDateTime(i.createdAt)}
                />
              </Heading>
              <Text 
                color="gray.600" 
                _dark={{ color: 'gray.300' }}
                fontSize="lg"
              >
                Duration: {" "}
                <SuspendedItem
                  item={interview}
                  fallback={<Skeleton className="w-24" />}
                  result={i => i.duration || 'Not recorded'}
                />
              </Text>
            </VStack>
            
            <SuspendedItem
              item={interview}
              fallback={<SkeletonButton className="w-32" />}
              result={i => (
                <FeedbackModal 
                  feedback={i.feedback}
                  interviewId={i.id}
                  generateFeedbackAction={generateInterviewFeedback}
                />
              )}
            />
          </Flex>
          
          <Box>
            <Suspense
              fallback={
                <Box display="flex" justifyContent="center" py={12}>
                  <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
                </Box>
              }
            >
              <Messages interview={interview} />
            </Suspense>
          </Box>
        </VStack>
      </VStack>
    </Container>
  )
}

async function Messages({
  interview,
}: {
  interview: Promise<{ humeChatId: string | null }>
}) {
  const { user, redirectToSignIn } = await getCurrentUser({ allData: true })
  if (user == null) return redirectToSignIn()
  const { humeChatId } = await interview
  if (humeChatId == null) return notFound()

  const condensedMessages = condenseChatMessages(
    await fetchChatMessages(humeChatId)
  )

  return (
    <CondensedMessages
      messages={condensedMessages}
      user={user}
      className="max-w-5xl mx-auto"
    />
  )
}

async function getInterview(id: string, userId: string) {
  "use cache"
  cacheTag(getInterviewIdTag(id))

  const interview = await db.query.InterviewTable.findFirst({
    where: eq(InterviewTable.id, id),
    with: {
      jobInfo: {
        columns: {
          id: true,
          userId: true,
        },
      },
    },
  })

  if (interview == null) return null

  cacheTag(getJobInfoIdTag(interview.jobInfo.id))
  if (interview.jobInfo.userId !== userId) return null

  return interview
}
