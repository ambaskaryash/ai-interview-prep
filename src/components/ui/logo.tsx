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
    <div className={cn("relative flex items-center justify-center text-primary", sizeClasses[size], iconClassName)}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Hexagon shape */}
        <path 
          d="M16 4L26 9V23L16 28L6 23V9L16 4Z" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinejoin="round"
        />
        {/* Brain/Circuit nodes inside */}
        <circle cx="16" cy="12" r="2" fill="currentColor"/>
        <circle cx="11" cy="20" r="2" fill="currentColor"/>
        <circle cx="21" cy="20" r="2" fill="currentColor"/>
        <path 
          d="M16 12L11 20H21L16 12Z" 
          stroke="currentColor" 
          strokeWidth="2"
        />
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