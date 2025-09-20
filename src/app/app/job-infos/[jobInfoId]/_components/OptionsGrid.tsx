"use client"

import { 
  SimpleGrid,
  Card,
  CardBody,
  Flex,
  VStack,
  Heading,
  Text,
  Icon
} from "@chakra-ui/react"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const options = [
  {
    label: "Answer Technical Questions",
    description:
      "Challenge yourself with practice questions tailored to your job description.",
    href: "questions",
  },
  {
    label: "Practice Interviewing",
    description: "Simulate a real interview with AI-powered mock interviews.",
    href: "interviews",
  },
  {
    label: "Refine Your Resume",
    description:
      "Get expert feedback on your resume and improve your chances of landing an interview.",
    href: "resume",
  },
  {
    label: "Update Job Description",
    description: "This should only be used for minor updates.",
    href: "edit",
  },
]

interface OptionsGridProps {
  jobInfoId: string
}

export function OptionsGrid({ jobInfoId }: OptionsGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
      {options.map(option => (
        <Card
          key={option.href}
          as={Link}
          href={`/app/job-infos/${jobInfoId}/${option.href}`}
          variant="elevated"
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{ 
            transform: 'translateY(-4px)',
            boxShadow: '2xl'
          }}
        >
          <CardBody>
            <Flex align="center" justify="space-between">
              <VStack align="start" spacing={2} flex={1}>
                <Heading as="h3" size="md" color="gray.800" _dark={{ color: 'white' }}>
                  {option.label}
                </Heading>
                <Text 
                  color="gray.600" 
                  _dark={{ color: 'gray.300' }}
                  fontSize="sm"
                >
                  {option.description}
                </Text>
              </VStack>
              <Icon 
                as={ArrowRightIcon} 
                boxSize={6} 
                color="gray.400" 
                ml={4}
                _groupHover={{ color: 'brand.500' }}
              />
            </Flex>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  )
}