"use client"

import { Skeleton } from "@/components/Skeleton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { cn } from "@/lib/utils"
import { aiAnalyzeSchema } from "@/services/ai/resumes/schemas"
import { useCompletion } from "@ai-sdk/react"
import { DeepPartial } from "ai"
import {
  AlertCircleIcon,
  CheckCircleIcon,
  UploadIcon,
  XCircleIcon,
} from "lucide-react"
import { ReactNode, useRef, useState, useMemo } from "react"
import { toast } from "sonner"
import z from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { FileTextIcon, Loader2Icon, RefreshCwIcon } from "lucide-react"

export function ResumePageClient({ jobInfoId, initialCoverLetter }: { jobInfoId: string; initialCoverLetter?: string | null }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileRef = useRef<File | null>(null)
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false)

  const {
    completion,
    isLoading,
    complete: generateAnalysis,
  } = useCompletion({
    api: "/api/ai/resumes/analyze",
    streamProtocol: "text",
    onResponse: (response) => {
      console.log("[client] Analysis response received:", response.status, response.statusText)
    },
    onFinish: (prompt, completion) => {
      console.log("[client] Analysis finished. Length:", completion.length)
      console.log("[client] Analysis content preview:", completion.slice(0, 100))
    },
    onError: (error) => {
      console.error("[client] Analysis error:", error)
      toast.error("Failed to analyze resume. Please try again.")
    },
    fetch: (url, options) => {
      const headers = new Headers(options?.headers)
      headers.delete("Content-Type")

      const formData = new FormData()
      if (fileRef.current) {
        formData.append("resumeFile", fileRef.current)
      }
      formData.append("jobInfoId", jobInfoId)

      console.log("[client] Sending resume analysis request...")
      return fetch(url, { ...options, headers, body: formData })
    },
  })

  const {
    completion: coverLetter,
    isLoading: isCoverLetterLoading,
    complete: generateCoverLetter,
  } = useCompletion({
    api: "/api/ai/resumes/cover-letter",
    streamProtocol: "text",
    onFinish: () => {
      toast.success("Cover letter generated successfully!")
    },
    onError: (error) => {
      console.error("[client] Cover letter error:", error)
      toast.error("Failed to generate cover letter.")
    },
    fetch: (url, options) => {
      const headers = new Headers(options?.headers)
      headers.delete("Content-Type")

      const formData = new FormData()
      if (fileRef.current) {
        formData.append("resumeFile", fileRef.current)
      }
      formData.append("jobInfoId", jobInfoId)

      return fetch(url, { ...options, headers, body: formData })
    },
  })

  // Debug completion updates
  useMemo(() => {
    if (completion) {
      console.log("[client] Completion updated. Length:", completion.length)
    }
  }, [completion])

  const aiAnalysis = useMemo(() => {
    if (!completion) return undefined
    try {
      // Robust JSON extraction
      const jsonStart = completion.indexOf("{")
      const jsonEnd = completion.lastIndexOf("}")
      
      if (jsonStart === -1 || jsonEnd === -1) {
        console.log("[client] JSON markers not found yet")
        return undefined
      }
      
      const jsonString = completion.slice(jsonStart, jsonEnd + 1)
      const parsed = JSON.parse(jsonString) as z.infer<typeof aiAnalyzeSchema>
      console.log("[client] Successfully parsed JSON analysis")
      return parsed
    } catch (error) {
      console.log("[client] JSON parse error (likely incomplete):", error)
      return undefined
    }
  }, [completion])

  function handleFileUpload(file: File | null) {
    fileRef.current = file
    if (file == null) return

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size exceeds 10MB limit")
      return
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, Word document, or text file")
      return
    }

    generateAnalysis("")
  }

  return (
    <div className="space-y-8 w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>
                {isLoading ? "Analyzing your resume" : "Upload your resume"}
              </CardTitle>
              <CardDescription>
                {isLoading
                  ? "This may take a couple minutes"
                  : "Get personalized feedback on your resume based on the job"}
              </CardDescription>
            </div>
            {aiAnalysis && (
              <Dialog open={isCoverLetterOpen} onOpenChange={setIsCoverLetterOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (!coverLetter && !isCoverLetterLoading) {
                        generateCoverLetter("")
                      }
                    }}
                  >
                    <FileTextIcon className="size-4 mr-2" />
                    Generate Cover Letter
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle>Cover Letter</DialogTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => generateCoverLetter("")}
                        disabled={isCoverLetterLoading}
                      >
                        <RefreshCwIcon
                          className={cn(
                            "size-4 mr-2",
                            isCoverLetterLoading && "animate-spin"
                          )}
                        />
                        Regenerate
                      </Button>
                    </div>
                    <DialogDescription>
                      AI-generated cover letter based on your resume and the job description.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4">
                    {isCoverLetterLoading && !coverLetter ? (
                      <div className="flex justify-center py-8">
                        <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
                      </div>
                    ) : (
                      <MarkdownRenderer>{coverLetter}</MarkdownRenderer>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <LoadingSwap loadingIconClassName="size-16" isLoading={isLoading}>
            <div
              className={cn(
                "mt-2 border-2 border-dashed rounded-lg p-6 transition-colors relative",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/50 bg-muted/10"
              )}
              onDragOver={e => {
                e.preventDefault()
                setIsDragOver(true)
              }}
              onDragLeave={e => {
                e.preventDefault()
                setIsDragOver(false)
              }}
              onDrop={e => {
                e.preventDefault()
                setIsDragOver(false)
                handleFileUpload(e.dataTransfer.files[0] ?? null)
              }}
            >
              <label htmlFor="resume-upload" className="sr-only">
                Upload your resume
              </label>
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="opacity-0 absolute inset-0 cursor-pointer"
                onChange={e => {
                  handleFileUpload(e.target.files?.[0] ?? null)
                }}
              />
              <div className="flex flex-col items-center justify-center text-center gap-4">
                <UploadIcon className="size-12 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-lg">
                    Drag your resume here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, Word docs, and text files
                  </p>
                </div>
              </div>
            </div>
          </LoadingSwap>
        </CardContent>
      </Card>

      <AnalysisResults aiAnalysis={aiAnalysis} isLoading={isLoading} />
    </div>
  )
}

type Keys = Exclude<
  keyof z.infer<typeof aiAnalyzeSchema>,
  "overallScore" | "bulletImprovements" | "missingKeywords"
>

function AnalysisResults({
  aiAnalysis,
  isLoading,
}: {
  aiAnalysis: DeepPartial<z.infer<typeof aiAnalyzeSchema>> | undefined
  isLoading: boolean
}) {
  if (!isLoading && aiAnalysis == null) return null

  const sections: Record<Keys, string> = {
    ats: "ATS Compatibility",
    jobMatch: "Job Match",
    writingAndFormatting: "Writing and Formatting",
    keywordCoverage: "Keyword Coverage",
    other: "Additional Insights",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription className="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <span>
              {aiAnalysis?.overallScore == null ? (
                <Skeleton className="w-32 inline-block" />
              ) : (
                <span className="font-semibold text-foreground">
                  Overall Score: {aiAnalysis.overallScore}/100
                </span>
              )}
            </span>
            <span>
              {aiAnalysis?.ats?.score == null ? (
                <Skeleton className="w-32 inline-block" />
              ) : (
                <span className="font-semibold text-foreground">
                  ATS Score: {aiAnalysis.ats.score}/100
                </span>
              )}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple">
            {Object.entries(sections).map(([key, title]) => {
              const category = aiAnalysis?.[key as Keys]

              return (
                <AccordionItem value={title} key={key}>
                  <AccordionTrigger>
                    <CategoryAccordionHeader
                      title={title}
                      score={category?.score}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="text-muted-foreground">
                        {category?.summary == null ? (
                          <span className="space-y-2">
                            <Skeleton />
                            <Skeleton className="w-3/4" />
                          </span>
                        ) : (
                          category.summary
                        )}
                      </div>
                      <div className="space-y-3">
                        {category?.feedback == null ? (
                          <>
                            <Skeleton className="h-16" />
                            <Skeleton className="h-16" />
                            <Skeleton className="h-16" />
                          </>
                        ) : (
                          category.feedback.map((item, index) => {
                            if (item == null) return null

                            return <FeedbackItem key={index} {...item} />
                          })
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Missing Keywords Section */}
      {aiAnalysis?.missingKeywords &&
        aiAnalysis.missingKeywords.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Missing Keywords</CardTitle>
              <CardDescription>
                Consider adding these keywords to your resume to match the job
                description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {aiAnalysis.missingKeywords.map((keyword, i) => (
                  <Badge key={i} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      {/* Bullet Improvements Section */}
      {aiAnalysis?.bulletImprovements &&
        aiAnalysis.bulletImprovements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Bullet Point Improvements</CardTitle>
              <CardDescription>
                AI-suggested rewrites for better impact.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiAnalysis.bulletImprovements.map((item, idx) => (
                <div
                  key={idx}
                  className="grid gap-2 border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">
                      Original
                    </span>
                    <div className="text-muted-foreground text-sm">
                      {item?.original}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-primary uppercase">
                      Improved
                    </span>
                    <div className="font-medium text-foreground">
                      {item?.improved}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground italic">
                    Why: {item?.explanation}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
    </div>
  )
}

function CategoryAccordionHeader({
  title,
  score,
}: {
  title: string
  score: number | undefined | null
}) {
  let badge: ReactNode
  if (score == null) {
    badge = <Skeleton className="w-16" />
  } else if (score >= 80) {
    badge = <Badge>Excellent</Badge>
  } else if (score >= 60) {
    badge = <Badge variant="warning">Ok</Badge>
  } else {
    badge = <Badge variant="destructive">Needs Works</Badge>
  }

  return (
    <div className="flex items-start justify-between w-full">
      <div className="flex flex-col items-start gap-1">
        <span>{title}</span>
        <div className="no-underline">{badge}</div>
      </div>
      {score == null ? <Skeleton className="w-12" /> : `${score}/100`}
    </div>
  )
}

function FeedbackItem({
  message,
  name,
  type,
}: Partial<z.infer<typeof aiAnalyzeSchema>["ats"]["feedback"][number]>) {
  if (name == null || message == null || type == null) return null

  const getColors = () => {
    switch (type) {
      case "strength":
        return "bg-primary/10 border border-primary/50"
      case "major-improvement":
        return "bg-destructive/10 dark:bg-destructive/20 border border-destructive/50 dark:border-destructive/70"
      case "minor-improvement":
        return "bg-warning/10 border border-warning/40"
      default:
        throw new Error(`Unknown feedback type: ${type satisfies never}`)
    }
  }

  const getIcon = () => {
    switch (type) {
      case "strength":
        return <CheckCircleIcon className="size-4 text-primary" />
      case "minor-improvement":
        return <AlertCircleIcon className="size-4 text-warning" />
      case "major-improvement":
        return <XCircleIcon className="size-4 text-destructive" />
      default:
        throw new Error(`Unknown feedback type: ${type satisfies never}`)
    }
  }

  return (
    <div
      className={cn(
        "flex items-baseline gap-3 pl-3 pr-5 py-5 rounded-lg",
        getColors()
      )}
    >
      <div>{getIcon()}</div>
      <div className="flex flex-col gap-1">
        <div className="text-base">{name}</div>
        <div className="text-muted-foreground">{message}</div>
      </div>
    </div>
  )
}
