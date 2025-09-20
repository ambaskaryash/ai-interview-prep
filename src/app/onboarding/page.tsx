import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { redirect } from "next/navigation"
import { OnboardingClient } from "./_client"
import { Container, VStack, Heading } from '@chakra-ui/react'

export default async function OnboardingPage() {
  const { userId, user } = await getCurrentUser({ allData: true })

  if (userId == null) return redirect("/")
  if (user != null) return redirect("/app")

  return (
    <Container 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
    >
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Creating your account...</Heading>
        <OnboardingClient userId={userId} />
      </VStack>
    </Container>
  )
}
