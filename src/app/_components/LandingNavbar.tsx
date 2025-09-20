'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import { SignInButton, useUser } from "@clerk/nextjs"
import { BrainCircuitIcon } from "lucide-react"
import Link from "next/link"

export function LandingNavbar() {
  const bg = useColorModeValue('whiteAlpha.900', 'blackAlpha.300')
  const borderColor = useColorModeValue('whiteAlpha.300', 'whiteAlpha.100')
  const { isSignedIn, isLoaded } = useUser()
  
  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={50}
      bg={bg}
      backdropFilter="blur(20px)"
      borderBottomWidth="1px"
      borderColor={borderColor}
    >
      <Container maxW="container.xl" py={4}>
        <Flex justify="space-between" align="center">
          <HStack spacing={4}>
            <Box position="relative">
              <Box
                position="absolute"
                inset={0}
                bg="purple.500"
                opacity={0.2}
                borderRadius="xl"
                filter="blur(10px)"
              />
              <Icon
                as={BrainCircuitIcon}
                boxSize={10}
                color="purple.500"
                position="relative"
              />
            </Box>
            <Heading
              size="lg"
              fontWeight="bold"
              letterSpacing="tight"
              bgGradient="linear(135deg, purple.500, blue.500)"
              bgClip="text"
            >
              EvoInterview
            </Heading>
          </HStack>
          
          {!isLoaded ? (
            <Button variant="outline" size="lg" isLoading>
              Loading...
            </Button>
          ) : isSignedIn ? (
            <Link href="/app">
              <Button size="lg" variant="gradient">
                Dashboard
              </Button>
            </Link>
          ) : (
            <SignInButton forceRedirectUrl="/app">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </SignInButton>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
