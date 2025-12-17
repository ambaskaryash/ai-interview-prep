"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCompletion } from "@ai-sdk/react"
import { BookOpenIcon, FileTextIcon, Loader2Icon, SparklesIcon } from "lucide-react"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { useState } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export function PreparationPageClient({ jobInfoId }: { jobInfoId: string }) {
  const [activeTab, setActiveTab] = useState<"study-plan" | "cheatsheet">("study-plan")

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 rounded-lg bg-muted p-1 max-w-md">
        <button
          onClick={() => setActiveTab("study-plan")}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            activeTab === "study-plan"
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:bg-muted-foreground/10"
          )}
        >
          Study Plan
        </button>
        <button
          onClick={() => setActiveTab("cheatsheet")}
          className={cn(
            "flex-1 rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            activeTab === "cheatsheet"
              ? "bg-background text-foreground shadow"
              : "text-muted-foreground hover:bg-muted-foreground/10"
          )}
        >
          Cheatsheet
        </button>
      </div>

      {activeTab === "study-plan" ? (
        <StudyPlanTab jobInfoId={jobInfoId} />
      ) : (
        <CheatsheetTab jobInfoId={jobInfoId} />
      )}
    </div>
  )
}

function StudyPlanTab({ jobInfoId }: { jobInfoId: string }) {
  const { completion, isLoading, complete } = useCompletion({
    api: "/api/ai/preparation/study-plan",
    streamProtocol: "text",
    body: { jobInfoId },
    onError: (err) => {
      console.error(err)
      toast.error("Failed to generate study plan")
    }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>3-Day Study Roadmap</CardTitle>
            <CardDescription>
              A structured plan to get you interview-ready in 3 days.
            </CardDescription>
          </div>
          {!completion && !isLoading && (
            <Button onClick={() => complete("")}>
              <SparklesIcon className="size-4 mr-2" />
              Generate Plan
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && !completion ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-4">
            <Loader2Icon className="size-8 animate-spin" />
            <p>Crafting your study plan...</p>
          </div>
        ) : !completion ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-4 border-2 border-dashed rounded-lg">
            <BookOpenIcon className="size-12 opacity-50" />
            <p>Click "Generate Plan" to get started.</p>
          </div>
        ) : (
          <MarkdownRenderer>{completion}</MarkdownRenderer>
        )}
      </CardContent>
    </Card>
  )
}

function CheatsheetTab({ jobInfoId }: { jobInfoId: string }) {
  const { completion, isLoading, complete } = useCompletion({
    api: "/api/ai/preparation/cheatsheet",
    streamProtocol: "text",
    body: { jobInfoId },
    onError: (err) => {
      console.error(err)
      toast.error("Failed to generate cheatsheet")
    }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Interview Cheatsheet</CardTitle>
            <CardDescription>
              Quick reference guide for the day of the interview.
            </CardDescription>
          </div>
          {!completion && !isLoading && (
            <Button onClick={() => complete("")}>
              <SparklesIcon className="size-4 mr-2" />
              Generate Cheatsheet
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && !completion ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-4">
            <Loader2Icon className="size-8 animate-spin" />
            <p>Compiling your cheatsheet...</p>
          </div>
        ) : !completion ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-4 border-2 border-dashed rounded-lg">
            <FileTextIcon className="size-12 opacity-50" />
            <p>Click "Generate Cheatsheet" to create your quick reference.</p>
          </div>
        ) : (
          <MarkdownRenderer>{completion}</MarkdownRenderer>
        )}
      </CardContent>
    </Card>
  )
}
