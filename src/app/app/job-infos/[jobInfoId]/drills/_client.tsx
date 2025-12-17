"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useCompletion } from "@ai-sdk/react"
import { ArrowRightIcon, CheckCircle2Icon, Loader2Icon, MessageSquareIcon, RefreshCwIcon } from "lucide-react"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { useState } from "react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

export function DrillsPageClient({ jobInfoId }: { jobInfoId: string }) {
  const [question, setQuestion] = useState<string | null>(null)
  const [answer, setAnswer] = useState("")

  const questionApi = useCompletion({
    api: "/api/ai/drills/question",
    streamProtocol: "text",
    body: { jobInfoId },
    onFinish: (prompt, completion) => {
      setQuestion(completion)
      setAnswer("") // Reset answer for new question
      feedbackApi.setCompletion("") // Reset feedback
    },
    onError: (err) => {
      console.error(err)
      toast.error("Failed to generate question")
    }
  })

  const feedbackApi = useCompletion({
    api: "/api/ai/drills/feedback",
    streamProtocol: "text",
    onError: (err) => {
      console.error(err)
      toast.error("Failed to generate feedback")
    }
  })

  const handleGenerateQuestion = () => {
    questionApi.complete("")
  }

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      toast.error("Please write an answer first")
      return
    }
    feedbackApi.complete("", { body: { jobInfoId, question, answer } })
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Question Section */}
      <Card className={question ? "border-primary/50" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareIcon className="size-5" />
            Interview Question
          </CardTitle>
          <CardDescription>
            AI will generate a targeted question based on your job description.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {questionApi.isLoading ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
              <Loader2Icon className="size-5 animate-spin" />
              <span>Generating question...</span>
            </div>
          ) : question ? (
            <div className="text-lg font-medium p-4 bg-muted/50 rounded-lg border">
              {question}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
              Click "New Question" to start practicing.
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGenerateQuestion} 
            disabled={questionApi.isLoading || feedbackApi.isLoading}
            variant={question ? "outline" : "default"}
            className="w-full sm:w-auto"
          >
            {questionApi.isLoading ? (
              <Loader2Icon className="size-4 animate-spin mr-2" />
            ) : (
              <RefreshCwIcon className="size-4 mr-2" />
            )}
            {question ? "New Question" : "Start Practice Drill"}
          </Button>
        </CardFooter>
      </Card>

      {/* Answer Section - Only show if there is a question */}
      {question && (
        <Card>
          <CardHeader>
            <CardTitle>Your Answer</CardTitle>
            <CardDescription>
              Write your response below. Focus on the STAR method.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="answer">Response</Label>
              <Textarea
                id="answer"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                disabled={feedbackApi.isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSubmitAnswer} 
              disabled={feedbackApi.isLoading || !answer.trim()}
              className="w-full sm:w-auto"
            >
              {feedbackApi.isLoading ? (
                <Loader2Icon className="size-4 animate-spin mr-2" />
              ) : (
                <CheckCircle2Icon className="size-4 mr-2" />
              )}
              Get AI Feedback
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Feedback Section */}
      {(feedbackApi.completion || feedbackApi.isLoading) && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400">AI Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackApi.isLoading && !feedbackApi.completion ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" />
                Analyzing your answer...
              </div>
            ) : (
              <MarkdownRenderer>{feedbackApi.completion}</MarkdownRenderer>
            )}
          </CardContent>
          {!feedbackApi.isLoading && (
            <CardFooter>
              <Button onClick={handleGenerateQuestion} className="w-full sm:w-auto">
                Next Question <ArrowRightIcon className="size-4 ml-2" />
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  )
}
