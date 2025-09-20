"use client"

import { BackLink } from "@/components/BackLink"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { 
  Container,
  VStack,
  HStack,
  Flex,
  Button,
  Textarea,
  Text,
  Box,
  Divider
} from "@chakra-ui/react"
import { LoadingSwap } from "@/components/ui/loading-swap"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  JobInfoTable,
  questionDifficulties,
  QuestionDifficulty,
} from "@/drizzle/schema"
import { formatQuestionDifficulty } from "@/features/questions/formatters"
import { useMemo, useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import { errorToast } from "@/lib/errorToast"
import z from "zod"

type Status = "awaiting-answer" | "awaiting-difficulty" | "init"

export function NewQuestionClientPage({
  jobInfo,
}: {
  jobInfo: Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title">
}) {
  const [status, setStatus] = useState<Status>("init")
  const [answer, setAnswer] = useState<string | null>(null)

  const {
    complete: generateQuestion,
    completion: question,
    setCompletion: setQuestion,
    isLoading: isGeneratingQuestion,
    data,
  } = useCompletion({
    api: "/api/ai/questions/generate-question",
    onFinish: () => {
      setStatus("awaiting-answer")
    },
    onError: error => {
      errorToast(error.message)
    },
  })

  const {
    complete: generateFeedback,
    completion: feedback,
    setCompletion: setFeedback,
    isLoading: isGeneratingFeedback,
  } = useCompletion({
    api: "/api/ai/questions/generate-feedback",
    onFinish: () => {
      setStatus("awaiting-difficulty")
    },
    onError: error => {
      errorToast(error.message)
    },
  })

  const questionId = useMemo(() => {
    const item = data?.at(-1)
    if (item == null) return null
    const parsed = z.object({ questionId: z.string() }).safeParse(item)
    if (!parsed.success) return null

    return parsed.data.questionId
  }, [data])

  return (
    <VStack spacing={4} h="calc(100vh - 4rem)" maxW="full" mx="auto">
      <Container maxW="6xl">
        <Flex align="center" justify="space-between" py={4} gap={4}>
          <Box flex="1">
            <BackLink href={`/app/job-infos/${jobInfo.id}`}>
              {jobInfo.name}
            </BackLink>
          </Box>
          <Controls
            reset={() => {
              setStatus("init")
              setQuestion("")
              setFeedback("")
              setAnswer(null)
            }}
            disableAnswerButton={
              answer == null || answer.trim() === "" || questionId == null
            }
            status={status}
            isLoading={isGeneratingFeedback || isGeneratingQuestion}
            generateFeedback={() => {
              if (answer == null || answer.trim() === "" || questionId == null)
                return

              generateFeedback(answer?.trim(), { body: { questionId } })
            }}
            generateQuestion={difficulty => {
              setQuestion("")
              setFeedback("")
              setAnswer(null)
              generateQuestion(difficulty, { body: { jobInfoId: jobInfo.id } })
            }}
          />
          <Box flex="1" display={{ base: 'none', md: 'block' }} />
        </Flex>
      </Container>
      <Divider />
      <Box flex="1" w="full">
        <QuestionContainer
          question={question}
          feedback={feedback}
          answer={answer}
          status={status}
          setAnswer={setAnswer}
        />
      </Box>
    </VStack>
  )
}

function QuestionContainer({
  question,
  feedback,
  answer,
  status,
  setAnswer,
}: {
  question: string | null
  feedback: string | null
  answer: string | null
  status: Status
  setAnswer: (value: string) => void
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-grow border-t">
      <ResizablePanel id="question-and-feedback" defaultSize={50} minSize={5}>
        <ResizablePanelGroup direction="vertical" className="flex-grow">
          <ResizablePanel id="question" defaultSize={25} minSize={5}>
            <ScrollArea className="h-full min-w-48 *:h-full">
              {status === "init" && question == null ? (
                <Flex align="center" justify="center" h="full" p={6}>
                  <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" textAlign="center">
                    Get started by selecting a question difficulty above.
                  </Text>
                </Flex>
              ) : (
                question && (
                  <MarkdownRenderer className="p-6">
                    {question}
                  </MarkdownRenderer>
                )
              )}
            </ScrollArea>
          </ResizablePanel>
          {feedback && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel id="feedback" defaultSize={75} minSize={5}>
                <ScrollArea className="h-full min-w-48 *:h-full">
                  <MarkdownRenderer className="p-6">
                    {feedback}
                  </MarkdownRenderer>
                </ScrollArea>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel id="answer" defaultSize={50} minSize={5}>
        <ScrollArea className="h-full min-w-48 *:h-full">
          <Textarea
            disabled={status !== "awaiting-answer"}
            onChange={e => setAnswer(e.target.value)}
            value={answer ?? ""}
            placeholder="Type your answer here..."
            className="w-full h-full resize-none border-none rounded-none focus-visible:ring focus-visible:ring-inset !text-base p-6"
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

function Controls({
  status,
  isLoading,
  disableAnswerButton,
  generateQuestion,
  generateFeedback,
  reset,
}: {
  disableAnswerButton: boolean
  status: Status
  isLoading: boolean
  generateQuestion: (difficulty: QuestionDifficulty) => void
  generateFeedback: () => void
  reset: () => void
}) {
  return (
    <HStack spacing={2}>
      {status === "awaiting-answer" ? (
        <>
          <Button
            onClick={reset}
            isDisabled={isLoading}
            variant="outline"
            size="sm"
            colorScheme="gray"
          >
            <LoadingSwap isLoading={isLoading}>Skip</LoadingSwap>
          </Button>
          <Button
            onClick={generateFeedback}
            isDisabled={disableAnswerButton}
            size="sm"
            colorScheme="brand"
          >
            <LoadingSwap isLoading={isLoading}>Answer</LoadingSwap>
          </Button>
        </>
      ) : (
        questionDifficulties.map(difficulty => (
          <Button
            key={difficulty}
            size="sm"
            isDisabled={isLoading}
            onClick={() => generateQuestion(difficulty)}
            colorScheme="brand"
            variant="outline"
          >
            <LoadingSwap isLoading={isLoading}>
              {formatQuestionDifficulty(difficulty)}
            </LoadingSwap>
          </Button>
        ))
      )}
    </HStack>
  )
}
