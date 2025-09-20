import { Box, BoxProps } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

interface ScrollAreaProps extends BoxProps {
  children: ReactNode
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box ref={ref} overflowY="auto" {...props}>
        {children}
      </Box>
    )
  }
)

ScrollArea.displayName = 'ScrollArea'