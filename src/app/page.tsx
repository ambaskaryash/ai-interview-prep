import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      <HowItWorks />
      <Features />
      <DetailedFeatures />
      <Stats />
      <Testimonials />
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

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "EvoInterview completely transformed my interview preparation. The AI practice sessions felt so realistic that I walked into my Google interview feeling completely confident. Landed the offer on my first try!",
      timeToOffer: "3 weeks",
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Stripe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "I was struggling with behavioral questions until I found EvoInterview. The AI helped me craft compelling stories and practice my delivery. Got offers from 3 different companies!",
      timeToOffer: "5 weeks",
    },
    {
      name: "Emily Park",
      role: "Data Scientist",
      company: "Netflix",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The resume optimization feature was a game-changer. My callback rate tripled after implementing EvoInterview&apos;s suggestions. Worth every penny and more.",
      timeToOffer: "4 weeks",
    },
    {
      name: "Alex Thompson",
      role: "Frontend Developer",
      company: "Airbnb",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The technical question practice was incredible. I went from failing coding interviews to acing them. The AI&apos;s feedback helped me identify and fix my weak spots immediately.",
      timeToOffer: "2 weeks",
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      company: "Figma",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "I was career-changing into tech and felt overwhelmed. EvoInterview&apos;s personalized guidance gave me the confidence to pursue design roles. Now I&apos;m living my dream at Figma!",
      timeToOffer: "6 weeks",
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      company: "AWS",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The salary negotiation tips alone paid for the platform 10x over. I increased my offer by $25K just by following EvoInterview&apos;s guidance. Absolutely worth it!",
      timeToOffer: "4 weeks",
       
    },
  ]

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Success stories from{" "}
            <span className="text-primary">real users</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join thousands of professionals who&apos;ve accelerated their
            careers with EvoInterview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl h-full"
            >
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <UserAvatar
                    className="size-10 flex-shrink-0"
                    user={{
                      imageUrl: testimonial.avatar,
                      name: testimonial.name,
                    }}
                  />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <blockquote className="text-muted-foreground leading-relaxed mb-4 italic flex-grow-1">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-primary">
                    @{testimonial.company}
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                    Hired in {testimonial.timeToOffer}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Ready to write your own success story?
          </p>
          <Button size="lg" className="h-12 px-8" asChild>
            <Link href="/app">Start Your Journey Today</Link>
          </Button>
        </div>
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
