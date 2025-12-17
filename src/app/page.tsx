import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CheckIcon, XIcon } from "lucide-react"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { SignInButton } from "@clerk/nextjs"
import {
  ActivityIcon,
  BookOpenCheckIcon,
  Brain,
  FileSlidersIcon,
  FileText,
  MicIcon,
  Search,
  SpeechIcon,
  TimerIcon,
  ZapIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Suspense } from "react"
import { UserAvatar } from "@/features/users/components/UserAvatar"
import { Logo } from "@/components/ui/logo"
// Pricing table import removed - app is now free to use

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EvoInterview",
    "description": "AI-powered interview preparation platform with voice practice, resume analysis, and personalized feedback. Land your dream job 2.3x faster.",
    "url": "https://evointerview.com",
    "applicationCategory": "EducationApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free AI-powered interview preparation platform"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "features": [
      "AI Interview Practice",
      "Resume Optimization", 
      "Technical Question Practice",
      "Voice Practice Sessions",
      "Personalized Feedback"
    ],
    "author": {
      "@type": "Organization",
      "name": "EvoInterview Team",
      "logo": {
        "@type": "ImageObject",
        "url": "https://evointerview.com/icon",
        "width": 32,
        "height": 32
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://evointerview.com/opengraph-image",
      "width": 1200,
      "height": 630,
      "alt": "EvoInterview - AI Interview Preparation Platform"
    }
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <ComparisonTable />
      <Features />
      <DetailedFeatures />
      <Stats />
      <FAQ />
      <Footer />
    </div>
  )
}

function Navbar() {
  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <Logo size="md" />
          <Suspense
            fallback={
              <SignInButton forceRedirectUrl="/app">
                <Button variant="outline">Sign In</Button>
              </SignInButton>
            }
          >
            <NavButton />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}

async function NavButton() {
  const { userId } = await getCurrentUser()

  if (userId == null) {
    return (
      <SignInButton forceRedirectUrl="/app">
        <Button variant="outline">Sign In</Button>
      </SignInButton>
    )
  }

  return (
    <Button asChild>
      <Link href="/app">Dashboard</Link>
    </Button>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            Master your interview delivery with{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-nowrap">
              real-time voice analytics
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Get data-driven feedback on your pace, tone, and confidence—not just your answers.
            Our AI platform eliminates anxiety and gives you the technical edge to land offers faster.
          </p>
          <Button size="lg" className="h-12 px-6 text-base" asChild>
            <Link href="/app">Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Analyze Resume",
      description: "Upload your resume to get instant ATS scoring and tailored optimization tips.",
    },
    {
      number: "02",
      title: "Practice Voice Interviews",
      description: "Engage in realistic voice conversations with our AI interviewer that adapts to you.",
    },
    {
      number: "03",
      title: "Get Granular Feedback",
      description: "Review detailed analytics on your speaking pace, filler words, and confidence levels.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Your path to interview mastery in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-lg transition-shadow">
                <div className="text-5xl font-bold text-primary/10 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComparisonTable() {
  const features = [
    {
      name: "Real-time Voice Feedback",
      evo: true,
      traditional: false,
      generic: false,
    },
    {
      name: "ATS Resume Optimization",
      evo: true,
      traditional: false,
      generic: true,
    },
    {
      name: "Speech Analytics (WPM, Fillers)",
      evo: true,
      traditional: false,
      generic: false,
    },
    {
      name: "Company-Specific Practice",
      evo: true,
      traditional: true,
      generic: false,
    },
    {
      name: "Instant Scoring & Metrics",
      evo: true,
      traditional: false,
      generic: false,
    },
    {
      name: "Free to Use",
      evo: true,
      traditional: false,
      generic: true,
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container max-w-5xl">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Why Choose EvoInterview?</h3>
          <p className="text-muted-foreground">
            See how we stack up against traditional methods and generic tools
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-6 text-left text-lg font-semibold text-foreground w-1/3">
                  Feature
                </th>
                <th className="py-4 px-6 text-center text-lg font-bold text-primary w-1/5 bg-primary/5 rounded-t-lg">
                  EvoInterview
                </th>
                <th className="py-4 px-6 text-center text-lg font-medium text-muted-foreground w-1/5">
                  Traditional Coaching
                </th>
                <th className="py-4 px-6 text-center text-lg font-medium text-muted-foreground w-1/5">
                  Generic Chatbots
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                >
                  <td className="py-4 px-6 text-foreground font-medium">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center bg-primary/5">
                    {feature.evo ? (
                      <div className="flex justify-center">
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                      </div>
                    ) : (
                      <XIcon className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.traditional ? (
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <XIcon className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {feature.generic ? (
                      <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <XIcon className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      title: "AI Interview Practice",
      Icon: SpeechIcon,
      description:
        "Simulate real interviews with AI that adapts to your responses. Build confidence and eliminate nervousness before the big day.",
    },
    {
      title: "Tailored Resume Suggestions",
      Icon: FileSlidersIcon,
      description:
        "Transform your resume into an ATS-friendly, recruiter-approved document that gets you more callbacks.",
    },
    {
      title: "Technical Question Practice",
      Icon: BookOpenCheckIcon,
      description:
        "Solve coding problems with guided hints and explanations. Perfect your approach to technical interviews.",
    },
  ]
  return (
    <section className="py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(feature => (
            <Card
              key={feature.title}
              className="transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 bg-primary/10 flex items-center justify-center rounded-lg">
                  <feature.Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function DetailedFeatures() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to{" "}
            <span className="text-primary">ace your interviews</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get hands-on experience with real interview scenarios, personalized
            feedback, and industry-proven strategies
          </p>
        </div>

        <div className="space-y-20">
          {/* AI Interview Practice */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <SpeechIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">
                  AI Interview Practice
                </h4>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Practice with our advanced AI interviewer that adapts to your
                responses and provides real-time feedback. Experience realistic
                interview scenarios for behavioral, technical, and case study
                questions.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Real-time voice interaction with AI interviewer
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Personalized feedback on communication style
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Industry-specific question banks
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Progress tracking and improvement metrics
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    AI Interviewer
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  &quot;Tell me about a time when you had to work with a
                  difficult team member...&quot;
                </p>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">You</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Your Response
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  &quot;In my previous role, I worked with a colleague who
                  consistently missed deadlines...&quot;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    Strong storytelling
                  </span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    Good structure
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Speech Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ActivityIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">
                  Deep Speech Analytics
                </h4>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Go beyond "good job". Our advanced speech analysis engine breaks
                down your delivery into actionable metrics. Understand your pacing,
                filler word usage, and confidence levels to sound more professional.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Real-time WPM (Words Per Minute) tracking
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Filler word detection (um, ah, like)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Vocal confidence scoring
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Tone and sentiment analysis
                </li>
              </ul>
            </div>
            <div className="lg:order-1 bg-card rounded-2xl p-6 border border-border shadow-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TimerIcon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">Pace</span>
                  </div>
                  <div className="text-2xl font-bold">145 <span className="text-xs font-normal text-muted-foreground">WPM</span></div>
                  <div className="text-xs text-green-500 mt-1">Optimal speed</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MicIcon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">Fillers</span>
                  </div>
                  <div className="text-2xl font-bold">2 <span className="text-xs font-normal text-muted-foreground">found</span></div>
                  <div className="text-xs text-muted-foreground mt-1">Top 10%</div>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ZapIcon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">Confidence Trend</span>
                  </div>
                  <span className="text-xs font-bold text-primary">High</span>
                </div>
                <div className="h-24 flex items-end gap-1 items-end justify-between px-2">
                   {[40, 60, 55, 70, 85, 80, 90, 85, 95, 90].map((h, i) => (
                      <div 
                        key={i} 
                        className="bg-primary/20 hover:bg-primary/40 transition-colors w-full rounded-t-sm relative group"
                        style={{ height: `${h}%` }}
                      >
                         {i === 8 && (
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap hidden group-hover:block">
                             Peak Confidence
                           </div>
                         )}
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resume Optimization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileSlidersIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">
                  Smart Resume Analysis
                </h4>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Transform your resume with AI-powered suggestions that optimize
                for ATS systems and recruiter preferences. Get specific,
                actionable feedback tailored to your target role and industry.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  ATS compatibility scoring and optimization
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Job description matching analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Industry-specific keyword suggestions
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Before/after impact measurement
                </li>
              </ul>
            </div>
            <div className="lg:order-1 bg-card rounded-2xl p-6 border border-border shadow-lg">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">
                    Resume Score
                  </span>
                  <span className="text-2xl font-bold text-primary">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-foreground">
                    ATS Compatibility
                  </span>
                  <span className="text-sm font-medium text-primary">
                    Excellent
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-foreground">Keyword Match</span>
                  <span className="text-sm font-medium text-primary">92%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm text-foreground">
                    Impact Statements
                  </span>
                  <span className="text-sm font-medium text-primary">Good</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-xs text-primary font-medium mb-1">
                  💡 Suggestion
                </p>
                <p className="text-xs text-muted-foreground">
                  Add 2 more quantified achievements to increase impact score
                </p>
              </div>
            </div>
          </div>

          {/* Technical Questions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpenCheckIcon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground">
                  Technical Interview Prep
                </h4>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Master coding interviews with our comprehensive practice
                platform. Get step-by-step guidance, hints, and detailed
                explanations for problems across all difficulty levels and
                topics.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  1000+ curated coding problems
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Real-time code execution and testing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  AI-powered hints and explanations
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Company-specific question patterns
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Two Sum
                  </span>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    Easy
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Given an array of integers, return indices of two numbers that
                  add up to target.
                </p>
                <div className="bg-background rounded p-2 font-mono text-xs">
                  <span className="text-primary">def</span>{" "}
                  <span className="text-foreground">twoSum</span>(
                  <span className="text-primary">nums, target</span>):
                  <br />
                  &nbsp;&nbsp;
                  <span className="text-muted-foreground">
                    # Your solution here
                  </span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="text-primary">✓</span> 3/5 test cases passed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  const stats = [
    {
      value: "2.3x",
      label: "Faster job placement",
      description:
        "Our users land offers in 4-6 weeks vs industry average of 12+ weeks",
    },
    {
      value: "65%",
      label: "Fewer interviews needed",
      description:
        "Average 3-4 interviews to land an offer vs typical 8-10 interviews",
    },
    {
      value: "89%",
      label: "Interview success rate",
      description:
        "Users who complete our prep program receive offers at 9/10 interviews",
    },
    {
      value: "$15K+",
      label: "Higher starting salaries",
      description:
        "Better negotiation skills lead to significantly higher compensation",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our users land jobs{" "}
            <span className="text-primary">faster and better</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. See how EvoInterview users
            consistently outperform the competition in every metric that
            matters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300"
            >
              <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-foreground mb-3">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-8 text-pretty">
            * Based on internal data from 2,500+ successful job placements in
            2024
          </p>
          <Button size="lg" className="h-12 px-6" asChild>
            <Link href="/app">Join thousands of successful job seekers</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function TrustedBy() {
  const companies = [
    "GOOGLE",
    "AMAZON",
    "MICROSOFT",
    "META",
    "NETFLIX",
    "UBER",
    "STRIPE",
    "AIRBNB",
  ]

  return (
    <section className="py-12 border-y border-border/40 bg-muted/10">
      <div className="container">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-widest">
          Trusted by candidates who landed jobs at
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60">
          {companies.map((company) => (
            <div
              key={company}
              className="text-xl sm:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      question: "How does the AI interview practice work?",
      answer:
        "Our AI simulates a real interviewer by asking you questions based on your role and experience. It listens to your spoken answers in real-time, analyzes your content and delivery, and provides instant, actionable feedback to help you improve.",
    },
    {
      question: "Is my resume data kept private?",
      answer:
        "Yes, absolutely. We take data privacy seriously. Your resume and personal information are encrypted and only used to generate personalized interview questions and feedback. We do not share your data with third parties.",
    },
    {
      question: "Can I practice for specific companies?",
      answer:
        "Yes! You can specify the company you are interviewing for, and our AI will tailor the questions and evaluation criteria to match that company's known interview style and values.",
    },
    {
      question: "Is it really free?",
      answer:
        "Yes, EvoInterview is currently free to use. We believe in democratizing access to high-quality career preparation tools. You get full access to all features including voice practice, resume analysis, and technical questions.",
    },
    {
      question: "What kind of feedback do I get?",
      answer:
        "You get detailed feedback on both what you say (content, structure, keywords) and how you say it (pace, filler words, confidence, tone). We also provide specific suggestions on how to rephrase your answers for better impact.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container max-w-3xl">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
          <p className="text-muted-foreground">
            Have questions? We&apos;re here to help.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

// Pricing function removed - app is now free to use

function Footer() {
  return (
    <footer className="py-6 bg-card border-t border-border">
      <div className="container">
        <div className="text-center">
          <p className="text-muted-foreground">
            Empowering your career journey with AI-powered job preparation
            tools.
          </p>
        </div>
      </div>
    </footer>
  )
}
