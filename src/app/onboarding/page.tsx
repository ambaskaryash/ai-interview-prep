import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { redirect } from "next/navigation"
import { OnboardingClient } from "./_client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Complete your EvoInterview profile setup to begin your AI-powered interview preparation journey.",
  robots: {
    index: false, // Don't index this page as it's for logged-in users only
    follow: false,
  },
}

export default async function OnboardingPage() {
  const { userId, user } = await getCurrentUser({ allData: true })

  if (userId == null) return redirect("/")
  if (user != null) return redirect("/app")

  return (
    <div className="container flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl">Creating your account...</h1>
      <OnboardingClient userId={userId} />
    </div>
  )
}
