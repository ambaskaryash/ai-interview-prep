import React from 'react'
import { cn } from '@/lib/utils'

export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-background p-10">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Logo Design Concepts</h1>
          <p className="text-muted-foreground text-lg">
            Please review the following options for the EvoInterview brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Option 1: Modern Growth */}
          <LogoCard
            title="Option 1: The 'Growth Wave'"
            description="Combines a speech bubble with an upward trend line, symbolizing improved interview performance through practice."
            LogoComponent={LogoOption1}
          />

          {/* Option 2: AI Nexus */}
          <LogoCard
            title="Option 2: The 'AI Nexus'"
            description="A central node connecting to others, representing the neural network of AI and the connection between candidate and career."
            LogoComponent={LogoOption2}
          />

          {/* Option 3: Minimal Monogram */}
          <LogoCard
            title="Option 3: The 'Evo Monogram'"
            description="A strong, geometric abstract 'E' that feels architectural and foundational. Professional and corporate."
            LogoComponent={LogoOption3}
          />

          {/* Option 4: Pulse Voice */}
          <LogoCard
            title="Option 4: The 'Voice Pulse'"
            description="Focuses on the voice-first nature of the app. A stylized sound wave forming a checkmark."
            LogoComponent={LogoOption4}
          />
        </div>
      </div>
    </div>
  )
}

function LogoCard({ title, description, LogoComponent }: { title: string, description: string, LogoComponent: React.ComponentType<any> }) {
  return (
    <div className="border rounded-xl p-8 bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-6 flex flex-col items-center justify-center h-48 bg-muted/20 rounded-lg border border-dashed border-border/50">
        <LogoComponent size="lg" className="mb-4" />
        <div className="flex gap-4">
          <LogoComponent size="md" />
          <LogoComponent size="sm" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

// --- Logo Implementations ---

function LogoOption1({ className, size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24' }
  const textSizeClasses = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative text-primary", sizeClasses[size])}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M4 24C4 24 6 12 16 12C26 12 28 24 28 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M16 12V6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="16" cy="6" r="3" fill="currentColor"/>
          <path d="M8 24L24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.3"/>
        </svg>
      </div>
      {size !== 'lg' && <span className={cn("font-bold tracking-tight", textSizeClasses[size])}>EvoInterview</span>}
    </div>
  )
}

function LogoOption2({ className, size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24' }
  const textSizeClasses = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative text-primary", sizeClasses[size])}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
           <rect x="6" y="6" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2.5" opacity="0.3"/>
           <path d="M16 10V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
           <path d="M10 14V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
           <path d="M22 14V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
           <circle cx="24" cy="8" r="3" fill="currentColor"/>
        </svg>
      </div>
      {size !== 'lg' && <span className={cn("font-bold font-mono tracking-tighter", textSizeClasses[size])}>EVO//INTERVIEW</span>}
    </div>
  )
}

function LogoOption3({ className, size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24' }
  const textSizeClasses = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative text-primary", sizeClasses[size])}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M26 6H6V26H26V6Z" stroke="currentColor" strokeWidth="0" fill="currentColor" fillOpacity="0.1"/>
          <path d="M10 10H22" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
          <path d="M10 16H18" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
          <path d="M10 22H22" stroke="currentColor" strokeWidth="3" strokeLinecap="square"/>
          <path d="M6 6L6 26" stroke="currentColor" strokeWidth="3"/>
        </svg>
      </div>
      {size !== 'lg' && <span className={cn("font-extrabold uppercase tracking-wide", textSizeClasses[size])}>EVO</span>}
    </div>
  )
}

function LogoOption4({ className, size = 'md' }: { className?: string, size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-24 h-24' }
  const textSizeClasses = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("relative text-primary", sizeClasses[size])}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
           <path d="M4 16C4 16 8 22 12 22C16 22 28 8 28 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
           <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.5"/>
           <circle cx="28" cy="20" r="2" fill="currentColor" opacity="0.3"/>
           <circle cx="20" cy="26" r="2" fill="currentColor" opacity="0.7"/>
        </svg>
      </div>
      {size !== 'lg' && <span className={cn("font-bold italic", textSizeClasses[size])}>EvoInterview</span>}
    </div>
  )
}
