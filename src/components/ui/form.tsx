'use client'

import {
  FormControl as ChakraFormControl,
  FormLabel as ChakraFormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

// Form wrapper component
export const Form = forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ children, ...props }, ref) => (
    <Box as="form" ref={ref} {...props}>
      {children}
    </Box>
  )
)
Form.displayName = 'Form'

// Form field wrapper
export const FormField = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

// Form item wrapper
export const FormItem = ({ children, ...props }: any) => (
  <ChakraFormControl {...props}>
    {children}
  </ChakraFormControl>
)

// Form label
export const FormLabel = ChakraFormLabel

// Form control
export const FormControl = ChakraFormControl

// Form description
export const FormDescription = FormHelperText

// Form message (for errors)
export const FormMessage = FormErrorMessage
