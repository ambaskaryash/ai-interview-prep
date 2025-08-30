import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@/services/clerk/components/ClerkProvider"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EvoInterview | Your Path to Interview Success",
  description: "EvoInterview helps you ace your job interviews with AI-powered mock interviews, personalized feedback, and comprehensive interview preparation tools.",
  keywords: ["interview preparation", "mock interview", "AI interview coach", "job interview", "career development", "interview skills"],
  openGraph: {
    title: "EvoInterview | Your Path to Interview Success",
    description: "EvoInterview helps you ace your job interviews with AI-powered mock interviews, personalized feedback, and comprehensive interview preparation tools.",
    url: "https://evointerview.com",
    siteName: "EvoInterview",
    images: [
      {
        url: "https://evointerview.com/og-image.jpg", // Replace with your actual Open Graph image URL
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
    images: ["https://evointerview.com/twitter-image.jpg"], // Replace with your actual Twitter card image URL
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
        <body className={`${outfitSans.variable} antialiased font-sans`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableColorScheme
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
