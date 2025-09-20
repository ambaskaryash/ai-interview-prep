import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, ...props }, ref) => {
    return (
      <ChakraBadge ref={ref} {...props}>
        {children}
      </ChakraBadge>
    )
  }
)

Badge.displayName = 'Badge'