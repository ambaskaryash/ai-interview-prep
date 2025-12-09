import { Suspense } from "react"
import { Loader2Icon } from "lucide-react"
import { ResumePageClient } from "@/app/app/job-infos/[jobInfoId]/resume/_client"

export default function ResumePage() {
  return (
    <div className="container py-4 space-y-4 h-screen-header flex flex-col items-start">
      <Suspense fallback={<Loader2Icon className="animate-spin size-24 m-auto" />}>
        <ResumePageClient />
      </Suspense>
    </div>
  )
}
