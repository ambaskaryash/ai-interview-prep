import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your EvoInterview account to access AI-powered interview preparation tools and practice sessions.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function SignInPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
