"use client"

import { 
  Box,
  VStack,
  Container,
  Button,
  Flex,
  Text,
  Spinner,
  IconButton,
  HStack,
  Center
} from "@chakra-ui/react"
import { env } from "@/data/env/client"
import { JobInfoTable } from "@/drizzle/schema"
import { createInterview, updateInterview } from "@/features/interviews/actions"
import { errorToast } from "@/lib/errorToast"
import { CondensedMessages } from "@/services/hume/components/CondensedMessages"
import { condenseChatMessages } from "@/services/hume/lib/condenseChatMessages"
import { useVoice, VoiceReadyState } from "@humeai/voice-react"
import { Loader2Icon, MicIcon, MicOffIcon, PhoneOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

export function StartCall({
  jobInfo,
  user,
  accessToken,
}: {
  accessToken: string
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "id" | "title" | "description" | "experienceLevel"
  >
  user: {
    name: string
    imageUrl: string
  }
}) {
  const { connect, readyState, chatMetadata, callDurationTimestamp } =
    useVoice()
  const [interviewId, setInterviewId] = useState<string | null>(null)
  const durationRef = useRef(callDurationTimestamp)
  const router = useRouter()
  durationRef.current = callDurationTimestamp

  // Sync chat ID
  useEffect(() => {
    if (chatMetadata?.chatId == null || interviewId == null) {
      return
    }
    updateInterview(interviewId, { humeChatId: chatMetadata.chatId })
  }, [chatMetadata?.chatId, interviewId])

  // Sync duration
  useEffect(() => {
    if (interviewId == null) return
    const intervalId = setInterval(() => {
      if (durationRef.current == null) return

      updateInterview(interviewId, { duration: durationRef.current })
    }, 10000)

    return () => clearInterval(intervalId)
  }, [interviewId])

  // Handle disconnect
  useEffect(() => {
    if (readyState !== VoiceReadyState.CLOSED) return
    if (interviewId == null) {
      return router.push(`/app/job-infos/${jobInfo.id}/interviews`)
    }

    if (durationRef.current != null) {
      updateInterview(interviewId, { duration: durationRef.current })
    }
    router.push(`/app/job-infos/${jobInfo.id}/interviews/${interviewId}`)
  }, [interviewId, readyState, router, jobInfo.id])

  if (readyState === VoiceReadyState.IDLE) {
    return (
      <Container maxW="2xl" centerContent>
        <VStack 
          spacing={8} 
          align="center" 
          justify="center" 
          minH="calc(100vh - 4rem)"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Text 
              fontSize={{ base: "2xl", md: "3xl" }} 
              fontWeight="bold" 
              color="gray.800"
              _dark={{ color: "white" }}
            >
              Ready to Start Your Interview?
            </Text>
            <Text 
              fontSize={{ base: "md", md: "lg" }} 
              color="gray.600"
              _dark={{ color: "gray.300" }}
              maxW="md"
              lineHeight="1.6"
            >
              This is an AI-powered mock interview for the position: 
              <Text as="span" fontWeight="semibold" color="brand.500">
                {jobInfo.title || "Software Developer"}
              </Text>
            </Text>
          </VStack>
          
          <Button
            size="lg"
            colorScheme="brand"
            px={8}
            py={6}
            fontSize="lg"
            fontWeight="semibold"
            borderRadius="xl"
            boxShadow="lg"
            _hover={{ 
              transform: "translateY(-2px)", 
              boxShadow: "xl" 
            }}
            transition="all 0.3s ease"
            onClick={async () => {
              try {
                console.log("Starting interview creation for jobInfo:", jobInfo.id)
                const res = await createInterview({ jobInfoId: jobInfo.id })
                console.log("Interview creation result:", res)
                
                if (res.error) {
                  console.error("Interview creation error:", res.message)
                  return errorToast(res.message)
                }
                setInterviewId(res.id)
                console.log("Interview created with ID:", res.id)

                console.log("Attempting to connect to Hume with config:", {
                  configId: env.NEXT_PUBLIC_HUME_CONFIG_ID,
                  hasAccessToken: !!accessToken,
                  accessTokenLength: accessToken?.length || 0
                })

                connect({
                  auth: { type: "accessToken", value: accessToken },
                  configId: env.NEXT_PUBLIC_HUME_CONFIG_ID,
                  sessionSettings: {
                    type: "session_settings",
                    variables: {
                      userName: user.name,
                      title: jobInfo.title || "Not Specified",
                      description: jobInfo.description,
                      experienceLevel: jobInfo.experienceLevel,
                    },
                  },
                })
                console.log("Connect function called")
              } catch (error) {
                console.error("Error in interview start:", error)
                errorToast("Failed to start interview: " + (error instanceof Error ? error.message : String(error)))
              }
            }}
          >
            Start Interview
          </Button>
          
          <Text 
            fontSize="sm" 
            color="gray.500"
            _dark={{ color: "gray.400" }}
          >
            Make sure your microphone is enabled and you're in a quiet environment.
          </Text>
        </VStack>
      </Container>
    )
  }

  if (
    readyState === VoiceReadyState.CONNECTING ||
    readyState === VoiceReadyState.CLOSED
  ) {
    return (
      <Center minH="calc(100vh - 4rem)">
        <VStack spacing={4}>
          <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
          <Text color="gray.600" _dark={{ color: "gray.300" }} fontSize="lg">
            {readyState === VoiceReadyState.CONNECTING 
              ? "Connecting to interview..."
              : "Ending interview..."
            }
          </Text>
        </VStack>
      </Center>
    )
  }

  return (
    <Box 
      overflowY="auto" 
      h="calc(100vh - 4rem)" 
      display="flex" 
      flexDirection="column-reverse"
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
    >
      <Container maxW="4xl" py={6} centerContent>
        <VStack spacing={6} w="full">
          <Messages user={user} />
          <Controls />
        </VStack>
      </Container>
    </Box>
  )
}

function Messages({ user }: { user: { name: string; imageUrl: string } }) {
  const { messages, fft } = useVoice()

  const condensedMessages = useMemo(() => {
    return condenseChatMessages(messages)
  }, [messages])

  return (
    <CondensedMessages
      messages={condensedMessages}
      user={user}
      maxFft={Math.max(...fft)}
      className="max-w-5xl"
    />
  )
}

function Controls() {
  const { disconnect, isMuted, mute, unmute, micFft, callDurationTimestamp } =
    useVoice()

  return (
    <HStack 
      spacing={5} 
      borderRadius="xl" 
      border="1px" 
      borderColor="gray.200"
      _dark={{ borderColor: "gray.700" }}
      px={5} 
      py={3} 
      bg="white"
      _dark={{ bg: "gray.800" }}
      boxShadow="lg"
      position="sticky"
      bottom={6}
    >
      <IconButton
        variant="ghost"
        size="md"
        icon={isMuted ? <MicOffIcon /> : <MicIcon />}
        onClick={() => (isMuted ? unmute() : mute())}
        aria-label={isMuted ? "Unmute" : "Mute"}
        color={isMuted ? "red.500" : "gray.600"}
        _hover={{ 
          bg: isMuted ? "red.50" : "gray.50",
          _dark: { bg: isMuted ? "red.900" : "gray.700" }
        }}
      />
      
      <Box h="40px" w="120px" display="flex" alignItems="center">
        <FftVisualizer fft={micFft} />
      </Box>
      
      <Text 
        fontSize="sm" 
        color="gray.500"
        _dark={{ color: "gray.400" }}
        fontFamily="mono"
        minW="16"
      >
        {callDurationTimestamp}
      </Text>
      
      <IconButton
        variant="ghost"
        size="md"
        icon={<PhoneOffIcon />}
        onClick={disconnect}
        aria-label="End Call"
        color="red.500"
        _hover={{ 
          bg: "red.50",
          _dark: { bg: "red.900" }
        }}
      />
    </HStack>
  )
}

function FftVisualizer({ fft }: { fft: number[] }) {
  return (
    <Flex gap={1} alignItems="center" h="full" justify="center">
      {fft.map((value, index) => {
        const percent = (value / 4) * 100
        return (
          <Box
            key={index}
            minH="2px"
            bg="brand.400"
            w="2px"
            borderRadius="sm"
            h={`${percent < 10 ? 0 : percent}%`}
            opacity={0.75}
            transition="height 0.1s ease"
          />
        )
      })}
    </Flex>
  )
}
