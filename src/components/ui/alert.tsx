import { Alert as ChakraAlert, AlertIcon, AlertTitle as ChakraAlertTitle, AlertDescription as ChakraAlertDescription, AlertProps } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ children, ...props }, ref) => {
    return (
      <ChakraAlert ref={ref} {...props}>
        <AlertIcon />
        {children}
      </ChakraAlert>
    )
  }
)

Alert.displayName = 'Alert'

interface AlertTitleProps {
  children: ReactNode
  className?: string
}

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <ChakraAlertTitle ref={ref} {...props}>
        {children}
      </ChakraAlertTitle>
    )
  }
)

AlertTitle.displayName = 'AlertTitle'

interface AlertDescriptionProps {
  children: ReactNode
  className?: string
}

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <ChakraAlertDescription ref={ref} {...props}>
        {children}
      </ChakraAlertDescription>
    )
  }
)

AlertDescription.displayName = 'AlertDescription'