import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import { Navbar } from "./_Navbar"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Access your personalized interview preparation dashboard with AI-powered practice sessions, resume analysis, and progress tracking.",
  robots: {
    index: false, // Don't index authenticated areas
    follow: false,
  },
}

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId, user } = await getCurrentUser({ allData: true })

  if (userId == null) return redirect("/")
  if (user == null) return redirect("/onboarding")

  return (
    <>
      <Navbar user={user} />
      {children}
    </>
  )
}
