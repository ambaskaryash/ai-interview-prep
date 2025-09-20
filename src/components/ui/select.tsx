'use client'

import { Select as ChakraSelect } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Select = ChakraSelect

// Select trigger is just the select element in Chakra UI
export const SelectTrigger = forwardRef<HTMLSelectElement, any>(
  (props, ref) => <ChakraSelect ref={ref} {...props} />
)
SelectTrigger.displayName = 'SelectTrigger'

// Select value placeholder
export const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <option value="" disabled hidden>
    {placeholder}
  </option>
)

// Select content is just a wrapper
export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

// Select item is an option
export const SelectItem = ({ value, children, ...props }: any) => (
  <option value={value} {...props}>
    {children}
  </option>
)
