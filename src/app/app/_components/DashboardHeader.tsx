"use client"

import { 
  Flex,
  Heading,
  Button,
  Icon
} from "@chakra-ui/react"
import { PlusIcon } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      align={{ base: 'stretch', md: 'center' }} 
      justify="space-between" 
      gap={4}
    >
      <Heading 
        as="h1" 
        size={{ base: 'xl', md: '2xl' }}
        color="gray.800"
        _dark={{ color: 'white' }}
      >
        Select a job description
      </Heading>
      <Button 
        colorScheme="brand" 
        size="lg"
        leftIcon={<Icon as={PlusIcon} />}
        as={Link}
        href="/app/job-infos/new"
      >
        Create Job Description
      </Button>
    </Flex>
  )
}