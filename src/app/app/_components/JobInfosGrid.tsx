"use client"

import { 
  SimpleGrid,
  Card,
  CardBody,
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Icon
} from "@chakra-ui/react"
import { ArrowRightIcon, PlusIcon } from "lucide-react"
import Link from "next/link"
import { formatExperienceLevel } from "@/features/jobInfos/lib/formatters"

type JobInfo = {
  id: string
  name: string
  description: string
  experienceLevel: "junior" | "mid-level" | "senior"
  title: string | null
}

interface JobInfosGridProps {
  jobInfos: JobInfo[]
}

export function JobInfosGrid({ jobInfos }: JobInfosGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
      {jobInfos.map(jobInfo => (
        <Card 
          key={jobInfo.id}
          as={Link}
          href={`/app/job-infos/${jobInfo.id}`}
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
              <VStack align="start" spacing={4} flex={1}>
                <Heading as="h3" size="md" color="gray.800" _dark={{ color: 'white' }}>
                  {jobInfo.name}
                </Heading>
                <Text
                  color="gray.600"
                  _dark={{ color: 'gray.300' }}
                  noOfLines={3}
                  fontSize="sm"
                >
                  {jobInfo.description}
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  <Badge 
                    colorScheme="purple" 
                    variant="subtle"
                    fontSize="xs"
                  >
                    {formatExperienceLevel(jobInfo.experienceLevel)}
                  </Badge>
                  {jobInfo.title && (
                    <Badge 
                      colorScheme="blue" 
                      variant="subtle"
                      fontSize="xs"
                    >
                      {jobInfo.title}
                    </Badge>
                  )}
                </HStack>
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
      
      <Card 
        as={Link} 
        href="/app/job-infos/new"
        cursor="pointer"
        border="2px dashed"
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
            direction="column" 
            gap={3}
            py={8}
          >
            <Icon as={PlusIcon} boxSize={8} color="gray.400" />
            <Text 
              fontSize="lg" 
              fontWeight="medium" 
              color="gray.600"
              _dark={{ color: 'gray.300' }}
            >
              New Job Description
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </SimpleGrid>
  )
}