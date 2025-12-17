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
  title: {
    default: "EvoInterview - AI Interview Prep Platform",
    template: "%s | EvoInterview"
  },
  description: "AI-powered interview preparation platform with voice practice, resume analysis, and personalized feedback. Land your dream job 2.3x faster with our comprehensive interview training.",
  keywords: [
    "AI interview prep",
    "interview practice",
    "resume optimization",
    "job preparation",
    "technical interview",
    "behavioral interview",
    "voice practice",
    "career development",
    "mock interview",
    "coding interview prep",
    "system design interview",
    "behavioral questions",
    "star method",
    "voice ai",
    "interview simulator",
    "speech analytics",
    "resume scorer",
    "ats checker"
  ],
  authors: [{ name: "EvoInterview Team" }],
  creator: "EvoInterview",
  publisher: "EvoInterview",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://evointerview.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EvoInterview - AI Interview Prep Platform",
    description: "AI-powered interview preparation platform with voice practice, resume analysis, and personalized feedback. Land your dream job 2.3x faster.",
    url: "https://evointerview.com", // Replace with your actual domain
    siteName: "EvoInterview",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image", // Next.js will automatically generate from opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: "EvoInterview - AI Interview Preparation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EvoInterview - AI Interview Prep Platform",
    description: "AI-powered interview preparation platform. Land your dream job 2.3x faster with our comprehensive training.",
    creator: "@evointerview", // Replace with your actual Twitter handle
    images: ["/twitter-image"], // Next.js will automatically generate from twitter-image.tsx
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you set up Google Search Console and other services
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
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
