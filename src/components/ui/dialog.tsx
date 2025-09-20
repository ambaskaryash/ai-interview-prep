'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import React, { forwardRef, createContext, useContext } from 'react'

// Context for dialog state
const DialogContext = createContext<ReturnType<typeof useDisclosure> | null>(null)

// Dialog (Modal) component
export const Dialog = ({ children, ...props }: any) => {
  const disclosure = useDisclosure()
  return (
    <DialogContext.Provider value={disclosure}>
      <Modal {...disclosure} {...props}>
        <ModalOverlay />
        {children}
      </Modal>
    </DialogContext.Provider>
  )
}

// Dialog trigger
export const DialogTrigger = ({ children, asChild, ...props }: { children: React.ReactNode; asChild?: boolean; [key: string]: any }) => {
  const context = useContext(DialogContext)
  if (!context) throw new Error('DialogTrigger must be used within Dialog')
  
  if (asChild && typeof children === 'object' && children) {
    // Clone the child element and add onClick
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: any) => {
        const originalOnClick = (children as any)?.props?.onClick
        if (originalOnClick) originalOnClick(e)
        context.onOpen()
      },
      ...props
    } as any)
  }
  
  return <div onClick={context.onOpen} {...props}>{children}</div>
}

// Dialog content
export const DialogContent = ModalContent

// Dialog title
export const DialogTitle = ModalHeader

// Dialog body
export const DialogBody = ModalBody

// Dialog close
export const DialogClose = ModalCloseButton
