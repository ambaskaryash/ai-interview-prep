"use client"

import { 
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Icon
} from "@chakra-ui/react"
import { ArrowRightIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { formatDateTime } from "@/lib/formatters"

type Interview = {
  id: string
  createdAt: Date
  duration: string | null
}

interface InterviewsGridProps {
  interviews: Interview[]
  jobInfoId: string
}

export function InterviewsGrid({ interviews, jobInfoId }: InterviewsGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
      <Card 
        as={Link} 
        href={`/app/job-infos/${jobInfoId}/interviews/new`}
        cursor="pointer"
        border="3px dashed"
        borderColor="gray.300"
        bg="transparent"
        transition="all 0.3s ease"
        _hover={{ 
          borderColor: 'brand.400',
          bg: 'brand.50',
          _dark: { bg: 'brand.900', borderColor: 'brand.300' }
        }}
      >
        <CardBody>
          <Flex 
            align="center" 
            justify="center" 
            direction="row" 
            gap={2}
            py={4}
          >
            <Icon as={PlusIcon} boxSize={6} color="gray.400" />
            <Text 
              fontSize="lg" 
              fontWeight="medium" 
              color="gray.600"
              _dark={{ color: 'gray.300' }}
            >
              New Interview
            </Text>
          </Flex>
        </CardBody>
      </Card>

      {interviews.map(interview => (
        <Card
          key={interview.id}
          as={Link}
          href={`/app/job-infos/${jobInfoId}/interviews/${interview.id}`}
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
                  {formatDateTime(interview.createdAt)}
                </Heading>
                <Text 
                  color="gray.600" 
                  _dark={{ color: 'gray.300' }}
                  fontSize="sm"
                >
                  {interview.duration || 'Duration not recorded'}
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

interface InterviewsHeaderProps {
  jobInfoId: string
}

export function InterviewsHeader({ jobInfoId }: InterviewsHeaderProps) {
  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }} 
      align={{ base: 'stretch', md: 'center' }} 
      justify="space-between" 
      gap={4}
      w="full"
    >
      <Heading 
        as="h1" 
        size={{ base: 'xl', md: '2xl', lg: '3xl' }}
        color="gray.800"
        _dark={{ color: 'white' }}
      >
        Interviews
      </Heading>
      <Card 
        as={Link}
        href={`/app/job-infos/${jobInfoId}/interviews/new`}
        cursor="pointer"
        bg="brand.500"
        color="white"
        transition="all 0.3s ease"
        _hover={{ 
          bg: 'brand.600',
          transform: 'translateY(-2px)',
          boxShadow: 'lg'
        }}
        px={4}
        py={2}
        borderRadius="md"
      >
        <HStack spacing={2}>
          <Icon as={PlusIcon} boxSize={4} />
          <Text fontWeight="medium">New Interview</Text>
        </HStack>
      </Card>
    </Flex>
  )
}