import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface CustomTextareaProps extends Omit<TextareaProps, 'disabled'> {
  disabled?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ disabled, ...props }, ref) => {
    return <ChakraTextarea ref={ref} isDisabled={disabled} {...props} />
  }
)

Textarea.displayName = 'Textarea'
