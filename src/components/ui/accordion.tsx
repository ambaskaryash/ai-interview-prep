'use client'

import {
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem as ChakraAccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

interface AccordionProps {
  children: React.ReactNode
  type?: 'single' | 'multiple'
  [key: string]: any
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', children, ...props }, ref) => {
    return (
      <ChakraAccordion 
        ref={ref}
        allowMultiple={type === 'multiple'}
        allowToggle={true}
        {...props}
      >
        {children}
      </ChakraAccordion>
    )
  }
)

Accordion.displayName = 'Accordion'

interface CustomAccordionItemProps {
  children: React.ReactNode
  value?: string
  [key: string]: any
}

export const AccordionItem = forwardRef<HTMLDivElement, CustomAccordionItemProps>(
  ({ value, children, ...props }, ref) => {
    return (
      <ChakraAccordionItem ref={ref} {...props}>
        {children}
      </ChakraAccordionItem>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  any
>((props, ref) => (
  <h2>
    <AccordionButton ref={ref} {...props}>
      <Box as="span" flex="1" textAlign="left">
        {props.children}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  </h2>
))

AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = AccordionPanel
