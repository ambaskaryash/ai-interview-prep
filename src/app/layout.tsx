import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@/services/clerk/components/ClerkProvider"
import { ChakraProviderWrapper } from '@/components/providers/ChakraProvider'
import { Toaster } from "@/components/ui/sonner"

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EvoInterview | Your Path to Interview Success",
  description: "EvoInterview helps you ace your job interviews with AI-powered mock interviews, personalized feedback, and comprehensive interview preparation tools.",
  keywords: ["AI interview preparation", "mock interview platform", "AI interview coach", "job interview practice", "career advancement", "interview skills training", "resume optimization", "coding interview prep", "behavioral interview questions", "technical interview tips", "EvoInterview", "AI-powered job search", "interview success", "personalized feedback", "interview simulator"],
  openGraph: {
    title: "EvoInterview | Your Path to Interview Success",
    description: "EvoInterview helps you ace your job interviews with AI-powered mock interviews, personalized feedback, and comprehensive interview preparation tools.",
    url: "https://evointerview.com",
    siteName: "EvoInterview",
    images: [
      {
        url: "https://evointerview.com/brain-circuit.png", // Replace with your actual Open Graph image URL
        width: 1200,
        height: 630,
        alt: "EvoInterview - AI-powered Interview Preparation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EvoInterview | Your Path to Interview Success",
    description: "EvoInterview helps you ace your job interviews with AI-powered mock interviews, personalized feedback, and comprehensive interview preparation tools.",
    creator: "@EvoInterview", // Replace with your Twitter handle
    images: ["https://evointerview.com/brain-circuit.png"], // Replace with your actual Twitter card image URL
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={outfitSans.variable}>
          <ChakraProviderWrapper>
            {children}
            <Toaster />
          </ChakraProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  )
}
