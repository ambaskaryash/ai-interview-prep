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
  Box
} from "@chakra-ui/react"
import { formatDateTime } from "@/lib/formatters"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { getInterview } from "@/services/clerk/lib/cached-queries"
import { notFound } from "next/navigation"

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
                <Button colorScheme="brand">
                  View Feedback
                </Button>
              )}
            />
          </Flex>
          
          <Box>
            <Box display="flex" justifyContent="center" py={12}>
              <Text>Interview messages would appear here</Text>
            </Box>
          </Box>
        </VStack>
      </VStack>
    </Container>
  )
}


