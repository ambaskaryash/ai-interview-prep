import { BackLink } from "@/components/BackLink"
import { Skeleton } from "@/components/Skeleton"
import { SuspendedItem } from "@/components/SuspendedItem"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobInfos/dbCache"
import { formatExperienceLevel } from "@/features/jobInfos/lib/formatters"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import {
  ArrowRightIcon,
  Calendar,
  FileText,
  MessageSquare,
  Mic,
  Pencil,
  Target,
} from "lucide-react"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import Link from "next/link"
import { notFound } from "next/navigation"

const options = [
  {
    label: "Answer Technical Questions",
    description:
      "Challenge yourself with practice questions tailored to your job description.",
    href: "questions",
    icon: MessageSquare,
  },
  {
    label: "Practice Interviewing",
    description: "Simulate a real interview with AI-powered mock interviews.",
    href: "interviews",
    icon: Mic,
  },
  {
    label: "Refine Your Resume",
    description:
      "Get expert feedback on your resume and improve your chances of landing an interview.",
    href: "resume",
    icon: FileText,
  },
  {
    label: "Preparation & Study Plan",
    description: "Get a 3-day study roadmap and a day-of cheatsheet.",
    href: "preparation",
    icon: Calendar,
  },
  {
    label: "Targeted Answer Drills",
    description: "Practice specific questions with focused AI feedback.",
    href: "drills",
    icon: Target,
  },
  {
    label: "Update Job Description",
    description: "This should only be used for minor updates.",
    href: "edit",
    icon: Pencil,
  },
]

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
    <div className="container my-4 space-y-8">
      <BackLink href="/app">Dashboard</BackLink>

      <div className="space-y-8">
        <header className="relative overflow-hidden rounded-xl border bg-muted/30 p-8">
          <div className="relative z-10 space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                <SuspendedItem
                  item={jobInfo}
                  fallback={<Skeleton className="w-48" />}
                  result={j => j.name}
                />
              </h1>
              <div className="flex gap-2">
                <SuspendedItem
                  item={jobInfo}
                  fallback={<Skeleton className="w-12" />}
                  result={j => (
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      {formatExperienceLevel(j.experienceLevel)}
                    </Badge>
                  )}
                />
                <SuspendedItem
                  item={jobInfo}
                  fallback={null}
                  result={j => {
                    return (
                      j.title && (
                        <Badge variant="outline" className="px-3 py-1 text-sm">
                          {j.title}
                        </Badge>
                      )
                    )
                  }}
                />
              </div>
            </div>
            <p className="max-w-3xl text-muted-foreground line-clamp-3 leading-relaxed">
              <SuspendedItem
                item={jobInfo}
                fallback={<Skeleton className="w-96" />}
                result={j => j.description}
              />
            </p>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map(option => (
            <Link
              className="group block h-full"
              href={`/app/job-infos/${jobInfoId}/${option.href}`}
              key={option.href}
            >
              <Card className="h-full transition-all duration-300 hover:border-primary/50 hover:shadow-md group-hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <option.icon className="size-6" />
                  </div>
                  <CardTitle className="text-xl">{option.label}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-0">
                  <div className="flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Get Started <ArrowRightIcon className="ml-1 size-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

async function getJobInfo(id: string, userId: string) {
  "use cache"
  cacheTag(getJobInfoIdTag(id))

  return db.query.JobInfoTable.findFirst({
    where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId)),
  })
}
