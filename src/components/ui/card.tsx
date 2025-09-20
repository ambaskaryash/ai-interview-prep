import { Box, BoxProps, Heading, Text, VStack } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

interface CardProps extends BoxProps {
  variant?: 'elevated' | 'glass' | 'solid'
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'elevated', ...props }, ref) => {
    return (
      <Box
        ref={ref}
        borderRadius="2xl"
        p={8}
        bg="whiteAlpha.900"
        backdropFilter="blur(20px)"
        borderWidth="1px"
        borderColor="whiteAlpha.300"
        boxShadow="xl"
        _dark={{
          bg: 'blackAlpha.300',
          borderColor: 'whiteAlpha.100',
        }}
        _hover={{
          transform: variant === 'elevated' ? 'translateY(-4px)' : 'none',
          boxShadow: variant === 'elevated' ? '3xl' : 'xl',
        }}
        transition="all 0.3s ease"
        {...props}
      >
        {children}
      </Box>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends BoxProps {
  children: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box ref={ref} mb={6} {...props}>
        {children}
      </Box>
    )
  }
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends BoxProps {
  children: ReactNode
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <Heading
        ref={ref as any}
        size="lg"
        fontWeight="bold"
        mb={3}
        letterSpacing="-0.02em"
        {...props}
      >
        {children}
      </Heading>
    )
  }
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends BoxProps {
  children: ReactNode
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <Text
        ref={ref as any}
        color="gray.600"
        _dark={{ color: 'gray.400' }}
        lineHeight="1.7"
        {...props}
      >
        {children}
      </Text>
    )
  }
)

CardDescription.displayName = 'CardDescription'

interface CardContentProps extends BoxProps {
  children: ReactNode
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box ref={ref} {...props}>
        {children}
      </Box>
    )
  }
)

CardContent.displayName = 'CardContent'

interface CardFooterProps extends BoxProps {
  children: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        mt={6}
        pt={6}
        borderTopWidth="1px"
        borderColor="gray.200"
        _dark={{ borderColor: 'gray.600' }}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

CardFooter.displayName = 'CardFooter'