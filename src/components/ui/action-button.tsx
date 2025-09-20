'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ReactNode } from 'react'

interface ActionButtonProps {
  children: ReactNode
  action: () => Promise<{ error: boolean; message?: string }>
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'gradient' | 'secondary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
}

export function ActionButton({ 
  children, 
  action, 
  variant = 'solid',
  size = 'md',
  disabled = false 
}: ActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = async () => {
    if (isLoading || disabled) return
    
    setIsLoading(true)
    try {
      await action()
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Button 
      variant={variant}
      size={size}
      onClick={handleClick}
      isLoading={isLoading}
      disabled={disabled || isLoading}
    >
      {children}
    </Button>
  )
}
