import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface CustomButtonProps extends ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'gradient' | 'secondary' | 'glass'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, variant = 'solid', colorScheme = 'brand', asChild, ...props }, ref) => {
    // Handle asChild for compatibility with shadcn/ui patterns
    if (asChild && typeof children === 'object' && children) {
      return children as React.ReactElement
    }
    if (variant === 'gradient') {
      return (
        <ChakraButton
          ref={ref}
          variant="solid"
          colorScheme="brand"
          bgGradient="linear(135deg, purple.500, blue.500)"
          _hover={{
            bgGradient: "linear(135deg, purple.600, blue.600)",
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          {...props}
        >
          {children}
        </ChakraButton>
      )
    }

    if (variant === 'glass') {
      return (
        <ChakraButton
          ref={ref}
          variant="outline"
          bg="whiteAlpha.200"
          backdropFilter="blur(10px)"
          borderColor="whiteAlpha.300"
          _hover={{
            bg: "whiteAlpha.300",
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          _dark={{
            bg: "blackAlpha.200",
            borderColor: "whiteAlpha.100",
            _hover: {
              bg: "blackAlpha.300"
            }
          }}
          {...props}
        >
          {children}
        </ChakraButton>
      )
    }

    // Map custom variants to Chakra variants
    const chakraVariant = variant === 'secondary' ? 'outline' : variant

    return (
      <ChakraButton
        ref={ref}
        variant={chakraVariant}
        colorScheme={variant === 'secondary' ? 'gray' : colorScheme}
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

Button.displayName = 'Button'

// Export buttonVariants for compatibility
export const buttonVariants = {
  solid: 'solid',
  outline: 'outline', 
  ghost: 'ghost',
  link: 'link',
  gradient: 'gradient'
}
