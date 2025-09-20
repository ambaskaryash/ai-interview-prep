import { BackLink } from "@/components/BackLink"
import { 
  Card, 
  CardBody,
  Container,
  VStack,
  Heading
} from "@chakra-ui/react"
import { JobInfoForm } from "@/features/jobInfos/components/JobInfoForm"

export default function JobInfoNewPage() {
  return (
    <Container maxW="4xl" px={{ base: 4, md: 6 }}>
      <VStack spacing={8} align="stretch">
        <BackLink href="/app">Dashboard</BackLink>

        <Heading 
          as="h1" 
          size={{ base: 'xl', md: '2xl' }}
          color="gray.800"
          _dark={{ color: 'white' }}
        >
          Create New Job Description
        </Heading>

        <Card variant="elevated" p={2}>
          <CardBody>
            <JobInfoForm />
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}
