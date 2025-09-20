import { Spinner, Box, BoxProps } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface LoadingSwapProps extends BoxProps {
  isLoading: boolean
  children: ReactNode
  fallback?: ReactNode
  loadingIconClassName?: string
}

export const LoadingSwap = ({ isLoading, children, fallback, loadingIconClassName, ...props }: LoadingSwapProps) => {
  const defaultFallback = fallback || (
    <Spinner size={loadingIconClassName?.includes('16') ? 'xl' : 'md'} />
  )
  
  return (
    <Box {...props}>
      {isLoading ? defaultFallback : children}
    </Box>
  )
}
