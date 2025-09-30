import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'icon' | 'text'
}

export function Logo({ className, size = 'md', variant = 'full' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  const IconOnly = ({ className: iconClassName }: { className?: string }) => (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], iconClassName)}>
      {/* Outer ring representing AI/tech */}
      <svg viewBox="0 0 32 32" className="w-full h-full">
        {/* Background gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--foreground))" />
            <stop offset="100%" stopColor="hsl(var(--foreground) / 0.8)" />
          </linearGradient>
        </defs>
        
        {/* Outer tech ring */}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          opacity="0.6"
        />
        
        {/* Inner solid circle */}
        <circle
          cx="16"
          cy="16"
          r="11"
          fill="url(#logoGradient)"
          opacity="0.1"
        />
        
        {/* AI Brain/Circuit pattern */}
        <g stroke="url(#accentGradient)" strokeWidth="1.2" fill="none">
          {/* Central node */}
          <circle cx="16" cy="16" r="2" fill="url(#logoGradient)" />
          
          {/* Neural network connections */}
          <path d="M16 14 L20 10 M16 14 L12 10 M16 18 L20 22 M16 18 L12 22" opacity="0.7" />
          <path d="M14 16 L10 16 M18 16 L22 16" opacity="0.7" />
          
          {/* Connection nodes */}
          <circle cx="20" cy="10" r="1.5" fill="url(#logoGradient)" opacity="0.8" />
          <circle cx="12" cy="10" r="1.5" fill="url(#logoGradient)" opacity="0.8" />
          <circle cx="20" cy="22" r="1.5" fill="url(#logoGradient)" opacity="0.8" />
          <circle cx="12" cy="22" r="1.5" fill="url(#logoGradient)" opacity="0.8" />
          <circle cx="10" cy="16" r="1.5" fill="url(#logoGradient)" opacity="0.8" />
          <circle cx="22" cy="16" r="1.5" fill="url(#logoGradient)" opacity="0.8" />
        </g>
        
        {/* Interview/speech bubble indicator */}
        <g opacity="0.8">
          <path
            d="M24 6 Q26 6 26 8 L26 12 Q26 14 24 14 L21 14 L19 16 L21 14 Q19 14 19 12 L19 8 Q19 6 21 6 Z"
            fill="url(#logoGradient)"
            opacity="0.3"
          />
          <circle cx="21" cy="9" r="0.5" fill="url(#accentGradient)" />
          <circle cx="23" cy="9" r="0.5" fill="url(#accentGradient)" />
          <circle cx="22" cy="11" r="0.5" fill="url(#accentGradient)" />
        </g>
      </svg>
    </div>
  )

  const TextOnly = ({ className: textClassName }: { className?: string }) => (
    <span className={cn("font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent", textClassName)}>
      EvoInterview
    </span>
  )

  if (variant === 'icon') {
    return <IconOnly className={className} />
  }

  if (variant === 'text') {
    return <TextOnly className={className} />
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconOnly />
      <TextOnly className={cn(
        size === 'sm' && "text-lg",
        size === 'md' && "text-xl", 
        size === 'lg' && "text-2xl"
      )} />
    </div>
  )
}

export default Logo