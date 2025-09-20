"use client"

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { ActionButton } from "@/components/ui/action-button"

interface FeedbackModalProps {
  feedback: string | null
  interviewId: string
  generateFeedbackAction: (interviewId: string) => Promise<any>
}

export function FeedbackModal({ feedback, interviewId, generateFeedbackAction }: FeedbackModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (feedback == null) {
    return (
      <ActionButton action={generateFeedbackAction.bind(null, interviewId)}>
        Generate Feedback
      </ActionButton>
    )
  }

  return (
    <>
      <Button 
        colorScheme="brand" 
        onClick={onOpen}
        size="md"
      >
        View Feedback
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxH="80vh">
          <ModalHeader>Interview Feedback</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MarkdownRenderer>{feedback}</MarkdownRenderer>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}