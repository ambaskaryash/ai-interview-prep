import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Badge,
  Avatar,
  Divider,
  Stack,
} from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser"
import { SignInButton } from "@clerk/nextjs"
import {
  BookOpenCheckIcon,
  Brain,
  BrainCircuitIcon,
  FileSlidersIcon,
  FileText,
  Search,
  SpeechIcon,
  ArrowRight,
  Play,
} from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { UserAvatar } from "@/features/users/components/UserAvatar"
import { PricingTable } from "@/services/clerk/components/PricingTable"
import { LandingNavbar } from "./_components/LandingNavbar"

export default async function LandingPage() {
  const { userId } = await getCurrentUser();

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* Background Elements */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="radial(ellipse 80% 80% at 50% -20%, purple.200, transparent)"
        opacity={0.3}
        _dark={{
          bgGradient: 'radial(ellipse 80% 80% at 50% -20%, purple.800, transparent)',
          opacity: 0.2
        }}
      />
      
      <LandingNavbar />
      <Hero />
      <Features />
      <DetailedFeatures />
      <Stats />
      <Testimonials />
      <Pricing />
      <Footer />
    </Box>
  )
}


function Hero() {
  return (
    <Box as="section" position="relative" overflow="hidden" py={20}>
      {/* Animated Background Elements */}
      <Box position="absolute" inset={0} pointerEvents="none">
        <Box 
          position="absolute" 
          top="25%" 
          left="25%" 
          w="72" 
          h="72" 
          bg="purple.500" 
          opacity={0.1} 
          borderRadius="full" 
          filter="blur(12px)" 
          className="animate-pulse" 
        />
        <Box 
          position="absolute" 
          bottom="25%" 
          right="25%" 
          w="96" 
          h="96" 
          bg="blue.500" 
          opacity={0.1} 
          borderRadius="full" 
          filter="blur(12px)" 
          className="animate-float" 
        />
      </Box>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "EvoInterview",
            url: "https://evointerview.com",
            logo: "https://evointerview.com/brain-circuit.svg",
            sameAs: [
              "https://twitter.com/evointerview",
              "https://linkedin.com/company/evointerview",
            ],
          }),
        }}
      />
      
      <Container maxW="6xl" position="relative">
        <VStack spacing={8} textAlign="center" maxW="5xl" mx="auto">
          <Box className="animate-slide-up">
            <Heading 
              as="h2" 
              fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }} 
              fontWeight="bold" 
              mb={8} 
              lineHeight={0.9} 
              letterSpacing="tighter"
            >
              Land your dream job with{" "}
              <Text 
                as="span" 
                className="text-gradient" 
                position="relative" 
                display="inline-block"
              >
                <Text
                  as="span"
                  position="absolute"
                  inset={0}
                  filter="blur(8px)"
                  opacity={0.3}
                  className="text-gradient animate-glow"
                >
                  AI-powered
                </Text>
                <Text as="span" position="relative">
                  AI-powered
                </Text>
              </Text>{" "}
              job preparation
            </Heading>
          </Box>
          
          <Box className="animate-slide-up" style={{animationDelay: '200ms', opacity: 0, animationFillMode: 'forwards'}}>
            <Text 
              fontSize={{ base: 'xl', md: '2xl' }} 
              color="gray.600" 
              maxW="4xl" 
              mx="auto" 
              lineHeight="relaxed" 
              fontWeight="light"
              _dark={{ color: 'gray.300' }}
            >
              Skip the guesswork and accelerate your job search. Our AI platform
              eliminates interview anxiety, optimizes your resume, and gives you
              the technical edge to land offers{" "}
              <Text as="span" color="purple.500" fontWeight="semibold">
                2.3x faster
              </Text>.
            </Text>
          </Box>
          
          <Stack 
            direction={{ base: 'column', sm: 'row' }} 
            spacing={4} 
            justify="center" 
            align="center"
            className="animate-slide-up" 
            style={{animationDelay: '400ms', opacity: 0, animationFillMode: 'forwards'}}
          >
            <Link href="/app">
              <Button 
                size="xl" 
                variant="gradient"
                className="hover-lift shadow-glow animate-glow"
                rightIcon={
                  <Icon viewBox="0 0 24 24" boxSize={5}>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" fill="none" />
                  </Icon>
                }
              >
                Get Started for Free
              </Button>
            </Link>
            <Button 
              variant="glass" 
              size="xl" 
              className="hover-lift"
              leftIcon={
                <Icon viewBox="0 0 24 24" boxSize={5}>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2z" fill="none" />
                </Icon>
              }
            >
              Watch Demo
            </Button>
          </Stack>
          
          <VStack 
            spacing={4} 
            mt={16} 
            textAlign="center" 
            className="animate-fade-in" 
            style={{animationDelay: '600ms', opacity: 0, animationFillMode: 'forwards'}}
          >
            <Text fontSize="sm" color="gray.500" _dark={{ color: 'gray.400' }}>
              Trusted by job seekers at
            </Text>
            <HStack spacing={8} justify="center" opacity={0.6}>
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="wider">Google</Text>
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="wider">Meta</Text>
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="wider">Apple</Text>
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="wider">Netflix</Text>
              <Text fontSize="2xl" fontWeight="bold" letterSpacing="wider">Amazon</Text>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

function Features() {
  const features = [
    {
      title: "AI Interview Practice",
      icon: (
        <Icon viewBox="0 0 24 24" boxSize={10} color="white">
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M17 15a3.5 3.5 0 0 0-.025-4.975" fill="none" />
        </Icon>
      ),
      description:
        "Simulate real interviews with AI that adapts to your responses. Build confidence and eliminate nervousness before the big day.",
      gradientFrom: "blue.500",
      gradientTo: "purple.500"
    },
    {
      title: "Tailored Resume Suggestions",
      icon: (
        <Icon viewBox="0 0 24 24" boxSize={10} color="white">
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M14 2v4a2 2 0 0 0 2 2h4" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M10 11v2" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M8 17h8" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M14 16v2" fill="none" />
        </Icon>
      ),
      description:
        "Transform your resume into an ATS-friendly, recruiter-approved document that gets you more callbacks.",
      gradientFrom: "emerald.500",
      gradientTo: "teal.500"
    },
    {
      title: "Technical Question Practice",
      icon: (
        <Icon viewBox="0 0 24 24" boxSize={10} color="white">
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 21V7" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="m16 12 2 2 4-4" fill="none" />
          <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" fill="none" />
        </Icon>
      ),
      description:
        "Solve coding problems with guided hints and explanations. Perfect your approach to technical interviews.",
      gradientFrom: "orange.500",
      gradientTo: "red.500"
    },
  ]
  
  return (
    <Box as="section" py={20} position="relative">
      <Container maxW="7xl">
        <VStack spacing={20} textAlign="center" className="animate-slide-up">
          <VStack spacing={6} maxW="4xl" mx="auto">
            <Heading 
              as="h3" 
              fontSize={{ base: '4xl', sm: '5xl' }} 
              fontWeight="bold" 
              letterSpacing="tight"
            >
              Everything you need to{" "}
              <Text as="span" className="text-gradient">succeed</Text>
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="3xl" 
              mx="auto" 
              lineHeight="relaxed"
              _dark={{ color: "gray.300" }}
            >
              Comprehensive AI-powered tools designed to accelerate your job search
              and land your dream position faster than ever.
            </Text>
          </VStack>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <Box
                key={feature.title}
                bg="whiteAlpha.900"
                backdropFilter="blur(20px)"
                borderWidth="1px"
                borderColor="whiteAlpha.300"
                borderRadius="2xl"
                p={8}
                boxShadow="xl"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "3xl"
                }}
                _dark={{
                  bg: "blackAlpha.300",
                  borderColor: "whiteAlpha.100"
                }}
                className="animate-slide-up"
                style={{
                  animationDelay: `${index * 200}ms`,
                  opacity: 0,
                  animationFillMode: "forwards"
                }}
              >
                <VStack spacing={6} textAlign="center">
                  <Box
                    w={20}
                    h={20}
                    mx="auto"
                    bgGradient={`linear(to-br, ${feature.gradientFrom}, ${feature.gradientTo})`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="2xl"
                    boxShadow="lg"
                    opacity={0.2}
                    transition="all 0.3s"
                    _hover={{
                      opacity: 0.3,
                      transform: "scale(1.1)",
                      boxShadow: "xl"
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Heading 
                    as="h4" 
                    fontSize="2xl" 
                    fontWeight="bold"
                    _dark={{ color: "white" }}
                  >
                    {feature.title}
                  </Heading>
                  <Text 
                    color="gray.600" 
                    fontSize="lg" 
                    lineHeight="relaxed"
                    _dark={{ color: "gray.300" }}
                  >
                    {feature.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

function DetailedFeatures() {
  // Create inline SVG icons to avoid serialization issues
  const SpeechIcon = () => (
    <Icon viewBox="0 0 24 24" boxSize={6}>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20" 
        fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M17 15a3.5 3.5 0 0 0-.025-4.975" fill="none" />
    </Icon>
  )
  
  const FileSlidersIcon = () => (
    <Icon viewBox="0 0 24 24" boxSize={6}>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M14 2v4a2 2 0 0 0 2 2h4" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M8 12h8" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M10 11v2" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M8 17h8" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M14 16v2" fill="none" />
    </Icon>
  )
  
  const BookOpenCheckIcon = () => (
    <Icon viewBox="0 0 24 24" boxSize={6}>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M12 21V7" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="m16 12 2 2 4-4" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" 
        fill="none" />
    </Icon>
  )
  
  const BrainIcon = () => (
    <Icon viewBox="0 0 24 24" boxSize={4}>
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M12 18V5" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M17.997 5.125a4 4 0 0 1 2.526 5.77" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M18 18a4 4 0 0 0 2-7.464" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M6 18a4 4 0 0 1-2-7.464" fill="none" />
      <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
        d="M6.003 5.125a4 4 0 0 0-2.526 5.77" fill="none" />
    </Icon>
  )

  return (
    <Box as="section" py={20} bg="gray.50" _dark={{ bg: "gray.900" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "EvoInterview Premium Plan",
            description: "AI-powered job preparation tools for interviews, resume optimization, and technical questions.",
            brand: {
              "@type": "Brand",
              name: "EvoInterview",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: "29.99", // Example price
              itemCondition: "https://schema.org/NewCondition",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9", // Example rating
              reviewCount: "1200", // Example review count
            },
          }),
        }}
      />
      <Container maxW="7xl">
        <VStack spacing={16} textAlign="center">
          <VStack spacing={6} maxW="4xl" mx="auto">
            <Heading 
              as="h3" 
              fontSize={{ base: '3xl', sm: '4xl' }} 
              fontWeight="bold" 
              mb={4}
            >
              Everything you need to{" "}
              <Text as="span" bgGradient="linear(to-r, purple.500, blue.500)" bgClip="text">
                ace your interviews
              </Text>
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="2xl" 
              mx="auto"
              _dark={{ color: "gray.300" }}
            >
              Get hands-on experience with real interview scenarios, personalized
              feedback, and industry-proven strategies
            </Text>
          </VStack>

          <VStack spacing={20} w="full">
            {/* AI Interview Practice */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center" w="full">
              <VStack spacing={6} align="flex-start">
                <Flex align="center" gap={3}>
                  <Box 
                    w={12} 
                    h={12} 
                    bg="purple.50" 
                    borderRadius="lg" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    _dark={{ bg: "purple.900" }}
                  >
                    <Box color="purple.500">
                      <SpeechIcon />
                    </Box>
                  </Box>
                  <Heading as="h4" fontSize="2xl" fontWeight="bold">
                    AI Interview Practice
                  </Heading>
                </Flex>
                <Text 
                  fontSize="lg" 
                  color="gray.600" 
                  lineHeight="relaxed"
                  _dark={{ color: "gray.300" }}
                >
                  Practice with our advanced AI interviewer that adapts to your
                  responses and provides real-time feedback. Experience realistic
                  interview scenarios for behavioral, technical, and case study
                  questions.
                </Text>
                <VStack spacing={3} align="flex-start" color="gray.600" _dark={{ color: "gray.300" }}>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>Real-time voice interaction with AI interviewer</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>Personalized feedback on communication style</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>Industry-specific question banks</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>Progress tracking and improvement metrics</Text>
                  </Flex>
                </VStack>
              </VStack>
              <Box bg="white" borderRadius="2xl" p={6} borderWidth={1} borderColor="gray.200" shadow="lg" _dark={{ bg: "gray.800", borderColor: "gray.600" }}>
                <Box bg="gray.50" borderRadius="lg" p={4} mb={4} _dark={{ bg: "gray.700" }}>
                  <Flex align="center" gap={3} mb={3}>
                    <Box 
                      w={8} 
                      h={8} 
                      bg="purple.100" 
                      borderRadius="full" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      _dark={{ bg: "purple.800" }}
                    >
                      <Box color="purple.500">
                        <BrainIcon />
                      </Box>
                    </Box>
                    <Text fontSize="sm" fontWeight="medium">
                      AI Interviewer
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.600" fontStyle="italic" _dark={{ color: "gray.300" }}>
                    &quot;Tell me about a time when you had to work with a
                    difficult team member...&quot;
                  </Text>
                </Box>
                <Box bg="purple.50" borderRadius="lg" p={4} _dark={{ bg: "purple.900" }}>
                  <Flex align="center" gap={3} mb={3}>
                    <Box 
                      w={8} 
                      h={8} 
                      bg="purple.100" 
                      borderRadius="full" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      _dark={{ bg: "purple.800" }}
                    >
                      <Text fontSize="xs" fontWeight="bold" color="purple.500">
                        You
                      </Text>
                    </Box>
                    <Text fontSize="sm" fontWeight="medium">
                      Your Response
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
                    &quot;In my previous role, I worked with a colleague who
                    consistently missed deadlines...&quot;
                  </Text>
                  <Flex gap={2} mt={3}>
                    <Badge colorScheme="purple" fontSize="xs" px={2} py={1}>
                      Strong storytelling
                    </Badge>
                    <Badge colorScheme="purple" fontSize="xs" px={2} py={1}>
                      Good structure
                    </Badge>
                  </Flex>
                </Box>
              </Box>
            </SimpleGrid>

            {/* Resume Optimization */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center" w="full">
              <Box order={{ lg: 2 }}>
                <VStack spacing={6} align="flex-start">
                  <Flex align="center" gap={3}>
                    <Box 
                      w={12} 
                      h={12} 
                      bg="purple.50" 
                      borderRadius="lg" 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      _dark={{ bg: "purple.900" }}
                    >
                      <Box color="purple.500">
                        <FileSlidersIcon />
                      </Box>
                    </Box>
                    <Heading as="h4" fontSize="2xl" fontWeight="bold">
                      Smart Resume Analysis
                    </Heading>
                  </Flex>
                  <Text 
                    fontSize="lg" 
                    color="gray.600" 
                    lineHeight="relaxed"
                    _dark={{ color: "gray.300" }}
                  >
                    Transform your resume with AI-powered suggestions that optimize
                    for ATS systems and recruiter preferences. Get specific,
                    actionable feedback tailored to your target role and industry.
                  </Text>
                  <VStack spacing={3} align="flex-start" color="gray.600" _dark={{ color: "gray.300" }}>
                    <Flex align="center" gap={3}>
                      <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                      <Text>ATS compatibility scoring and optimization</Text>
                    </Flex>
                    <Flex align="center" gap={3}>
                      <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                      <Text>Job description matching analysis</Text>
                    </Flex>
                    <Flex align="center" gap={3}>
                      <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                      <Text>Industry-specific keyword suggestions</Text>
                    </Flex>
                    <Flex align="center" gap={3}>
                      <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                      <Text>Before/after impact measurement</Text>
                    </Flex>
                  </VStack>
                </VStack>
              </Box>
              <Box order={{ lg: 1 }} bg="white" borderRadius="2xl" p={6} borderWidth={1} borderColor="gray.200" shadow="lg" _dark={{ bg: "gray.800", borderColor: "gray.600" }}>
                <Box mb={4}>
                  <Flex justify="space-between" align="center" mb={3}>
                    <Text fontSize="sm" fontWeight="medium">
                      Resume Score
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                      87%
                    </Text>
                  </Flex>
                  <Box w="full" bg="gray.200" borderRadius="full" h={2} _dark={{ bg: "gray.600" }}>
                    <Box 
                      bg="purple.500" 
                      h={2} 
                      borderRadius="full" 
                      w="87%"
                    />
                  </Box>
                </Box>
                <VStack spacing={3}>
                  <Flex w="full" justify="space-between" align="center" p={3} bg="gray.50" borderRadius="lg" _dark={{ bg: "gray.700" }}>
                    <Text fontSize="sm">ATS Compatibility</Text>
                    <Text fontSize="sm" fontWeight="medium" color="purple.500">
                      Excellent
                    </Text>
                  </Flex>
                  <Flex w="full" justify="space-between" align="center" p={3} bg="gray.50" borderRadius="lg" _dark={{ bg: "gray.700" }}>
                    <Text fontSize="sm">Keyword Match</Text>
                    <Text fontSize="sm" fontWeight="medium" color="purple.500">
                      92%
                    </Text>
                  </Flex>
                  <Flex w="full" justify="space-between" align="center" p={3} bg="gray.50" borderRadius="lg" _dark={{ bg: "gray.700" }}>
                    <Text fontSize="sm">Impact Statements</Text>
                    <Text fontSize="sm" fontWeight="medium" color="purple.500">
                      Good
                    </Text>
                  </Flex>
                </VStack>
                <Box mt={4} p={3} bg="purple.50" borderRadius="lg" _dark={{ bg: "purple.900" }}>
                  <Text fontSize="xs" color="purple.500" fontWeight="medium" mb={1}>
                    💡 Suggestion
                  </Text>
                  <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.300" }}>
                    Add 2 more quantified achievements to increase impact score
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>

            {/* Technical Questions */}
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center" w="full">
              <VStack spacing={6} align="flex-start">
                <Flex align="center" gap={3}>
                  <Box 
                    w={12} 
                    h={12} 
                    bg="purple.50" 
                    borderRadius="lg" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    _dark={{ bg: "purple.900" }}
                  >
                    <Box color="purple.500">
                      <BookOpenCheckIcon />
                    </Box>
                  </Box>
                  <Heading as="h4" fontSize="2xl" fontWeight="bold">
                    Technical Interview Prep
                  </Heading>
                </Flex>
                <Text 
                  fontSize="lg" 
                  color="gray.600" 
                  lineHeight="relaxed"
                  _dark={{ color: "gray.300" }}
                >
                  Master coding interviews with our comprehensive practice
                  platform. Get step-by-step guidance, hints, and detailed
                  explanations for problems across all difficulty levels and
                  topics.
                </Text>
                <VStack spacing={3} align="flex-start" color="gray.600" _dark={{ color: "gray.300" }}>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>1000+ curated coding problems</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>Real-time code execution and testing</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>AI-powered hints and explanations</Text>
                  </Flex>
                  <Flex align="center" gap={3}>
                    <Box w={2} h={2} bg="purple.500" borderRadius="full" />
                    <Text>Company-specific question patterns</Text>
                  </Flex>
                </VStack>
              </VStack>
              <Box bg="white" borderRadius="2xl" p={6} borderWidth={1} borderColor="gray.200" shadow="lg" _dark={{ bg: "gray.800", borderColor: "gray.600" }}>
                <Box bg="gray.50" borderRadius="lg" p={4} mb={4} _dark={{ bg: "gray.700" }}>
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      Two Sum
                    </Text>
                    <Badge colorScheme="purple" fontSize="xs" px={2} py={1}>
                      Easy
                    </Badge>
                  </Flex>
                  <Text fontSize="xs" color="gray.600" mb={3} _dark={{ color: "gray.300" }}>
                    Given an array of integers, return indices of two numbers that
                    add up to target.
                  </Text>
                  <Box bg="gray.800" borderRadius="md" p={2} fontFamily="mono" fontSize="xs" color="gray.300" _dark={{ bg: "gray.900" }}>
                    <Text as="span" color="purple.400">def</Text>{" "}
                    <Text as="span" color="white">twoSum</Text>(
                    <Text as="span" color="purple.400">nums, target</Text>):
                    <br />
                    &nbsp;&nbsp;
                    <Text as="span" color="gray.500">
                      # Your solution here
                    </Text>
                  </Box>
                </Box>
                <Text fontSize="xs" color="gray.600" _dark={{ color: "gray.300" }}>
                  <Text as="span" color="purple.500">✓</Text> 3/5 test cases passed
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

function Stats() {
  const stats = [
    {
      value: "2.3x",
      label: "Faster job placement",
      description:
        "Our users land offers in 4-6 weeks vs industry average of 12+ weeks",
    },
    {
      value: "65%",
      label: "Fewer interviews needed",
      description:
        "Average 3-4 interviews to land an offer vs typical 8-10 interviews",
    },
    {
      value: "89%",
      label: "Interview success rate",
      description:
        "Users who complete our prep program receive offers at 9/10 interviews",
    },
    {
      value: "$15K+",
      label: "Higher starting salaries",
      description:
        "Better negotiation skills lead to significantly higher compensation",
    },
  ]

  return (
    <Box as="section" py={20} bg="gray.100" _dark={{ bg: "gray.800" }}>
      <Container maxW="7xl">
        <VStack spacing={16} textAlign="center">
          <VStack spacing={6} maxW="4xl" mx="auto">
            <Heading 
              as="h3" 
              fontSize={{ base: '3xl', sm: '4xl' }} 
              fontWeight="bold" 
              mb={4}
            >
              Our users land jobs{" "}
              <Text as="span" bgGradient="linear(to-r, purple.500, blue.500)" bgClip="text">
                faster and better
              </Text>
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="2xl" 
              mx="auto"
              _dark={{ color: "gray.300" }}
            >
              Don&apos;t just take our word for it. See how EvoInterview users
              consistently outperform the competition in every metric that
              matters.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={8} w="full">
            {stats.map((stat, index) => (
              <Box
                key={index}
                textAlign="center"
                p={6}
                borderRadius="2xl"
                bg="whiteAlpha.600"
                backdropFilter="blur(10px)"
                borderWidth={1}
                borderColor="whiteAlpha.500"
                shadow="lg"
                transition="all 0.3s"
                _hover={{
                  bg: "whiteAlpha.800",
                  transform: "translateY(-2px)",
                  shadow: "xl"
                }}
                _dark={{
                  bg: "blackAlpha.600",
                  borderColor: "whiteAlpha.200",
                  _hover: {
                    bg: "blackAlpha.800"
                  }
                }}
              >
                <Text 
                  fontSize={{ base: '4xl', sm: '5xl' }} 
                  fontWeight="bold" 
                  color="purple.500" 
                  mb={2}
                >
                  {stat.value}
                </Text>
                <Text fontSize="lg" fontWeight="semibold" mb={3}>
                  {stat.label}
                </Text>
                <Text 
                  fontSize="sm" 
                  color="gray.600" 
                  lineHeight="relaxed"
                  _dark={{ color: "gray.300" }}
                >
                  {stat.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <VStack spacing={8} textAlign="center" mt={12}>
            <Text 
              fontSize="sm" 
              color="gray.500" 
              _dark={{ color: "gray.400" }}
            >
              * Based on internal data from 2,500+ successful job placements in
              2024
            </Text>
            <Link href="/app">
              <Button 
                size="lg" 
                bg="purple.500" 
                color="white" 
                px={6} 
                py={3}
                _hover={{ bg: "purple.600" }}
              >
                Join thousands of successful job seekers
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "EvoInterview completely transformed my interview preparation. The AI practice sessions felt so realistic that I walked into my Google interview feeling completely confident. Landed the offer on my first try!",
      timeToOffer: "3 weeks",
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Stripe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "I was struggling with behavioral questions until I found EvoInterview. The AI helped me craft compelling stories and practice my delivery. Got offers from 3 different companies!",
      timeToOffer: "5 weeks",
    },
    {
      name: "Emily Park",
      role: "Data Scientist",
      company: "Netflix",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The resume optimization feature was a game-changer. My callback rate tripled after implementing EvoInterview&apos;s suggestions. Worth every penny and more.",
      timeToOffer: "4 weeks",
    },
    {
      name: "Alex Thompson",
      role: "Frontend Developer",
      company: "Airbnb",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The technical question practice was incredible. I went from failing coding interviews to acing them. The AI&apos;s feedback helped me identify and fix my weak spots immediately.",
      timeToOffer: "2 weeks",
    },
    {
      name: "Priya Patel",
      role: "UX Designer",
      company: "Figma",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "I was career-changing into tech and felt overwhelmed. EvoInterview&apos;s personalized guidance gave me the confidence to pursue design roles. Now I&apos;m living my dream at Figma!",
      timeToOffer: "6 weeks",
    },
    {
      name: "David Kim",
      role: "DevOps Engineer",
      company: "AWS",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=face&auto=format&q=80",
      content:
        "The salary negotiation tips alone paid for the platform 10x over. I increased my offer by $25K just by following EvoInterview&apos;s guidance. Absolutely worth it!",
      timeToOffer: "4 weeks",
    },
  ]

  return (
    <Box as="section" py={20}>
      <Container maxW="7xl">
        <VStack spacing={16} textAlign="center">
          <VStack spacing={6} maxW="4xl" mx="auto">
            <Heading 
              as="h3" 
              fontSize={{ base: '3xl', sm: '4xl' }} 
              fontWeight="bold" 
              mb={4}
            >
              Success stories from{" "}
              <Text as="span" bgGradient="linear(to-r, purple.500, blue.500)" bgClip="text">
                real users
              </Text>
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="2xl" 
              mx="auto"
              _dark={{ color: "gray.300" }}
            >
              Join thousands of professionals who&apos;ve accelerated their
              careers with EvoInterview
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {testimonials.map((testimonial, index) => (
              <Box
                key={index}
                position="relative"
                overflow="hidden"
                transition="all 0.3s"
                transform="auto"
                _hover={{
                  translateY: "-4px",
                  shadow: "3xl"
                }}
                h="full"
                bg="white"
                borderRadius="2xl"
                p={8}
                borderWidth={1}
                borderColor="whiteAlpha.300"
                shadow="xl"
                backdropFilter="blur(20px)"
                _dark={{
                  bg: "blackAlpha.300",
                  borderColor: "whiteAlpha.100"
                }}
              >
                <VStack spacing={6} h="full">
                  <Flex align="center" gap={3} w="full" justify="flex-start">
                    <Avatar
                      size="md"
                      src={testimonial.avatar}
                      name={testimonial.name}
                      flexShrink={0}
                    />
                    <VStack align="flex-start" spacing={1}>
                      <Text fontWeight="semibold">
                        {testimonial.name}
                      </Text>
                      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.400" }}>
                        {testimonial.role}
                      </Text>
                    </VStack>
                  </Flex>

                  <Text 
                    color="gray.600" 
                    lineHeight="relaxed" 
                    fontStyle="italic" 
                    flex={1}
                    _dark={{ color: "gray.300" }}
                  >
                    &quot;{testimonial.content}&quot;
                  </Text>

                  <Flex w="full" justify="space-between" align="center">
                    <Text fontSize="sm" fontWeight="medium" color="purple.500">
                      @{testimonial.company}
                    </Text>
                    <Badge 
                      colorScheme="gray" 
                      fontSize="xs" 
                      px={2} 
                      py={1} 
                      borderRadius="full"
                    >
                      Hired in {testimonial.timeToOffer}
                    </Badge>
                  </Flex>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>

          <VStack spacing={6} textAlign="center" mt={12}>
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              Ready to write your own success story?
            </Text>
            <Link href="/app">
              <Button 
                size="lg" 
                bg="purple.500" 
                color="white" 
                px={8} 
                py={3}
                _hover={{ bg: "purple.600" }}
              >
                Start Your Journey Today
              </Button>
            </Link>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

function Pricing() {
  return (
    <Box as="section" py={20} bg="gray.50" _dark={{ bg: "gray.900" }}>
      <Container maxW="7xl">
        <VStack spacing={16} textAlign="center">
          <VStack spacing={6} maxW="4xl" mx="auto">
            <Heading 
              as="h3" 
              fontSize={{ base: '3xl', sm: '4xl' }} 
              fontWeight="bold" 
              mb={4}
            >
              Choose your{" "}
              <Text as="span" bgGradient="linear(to-r, purple.500, blue.500)" bgClip="text">
                career acceleration
              </Text>{" "}
              plan
            </Heading>
            <Text 
              fontSize="xl" 
              color="gray.600" 
              maxW="2xl" 
              mx="auto"
              _dark={{ color: "gray.300" }}
            >
              Invest in your future with flexible pricing options designed to fit
              your career goals and budget
            </Text>
          </VStack>

          <Box maxW="5xl" mx="auto">
            <PricingTable />
          </Box>

          <VStack spacing={4} textAlign="center" mt={12}>
            <Text 
              fontSize="sm" 
              color="gray.500" 
              _dark={{ color: "gray.400" }}
            >
              All plans include a 7-day refund period. Cancel anytime.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

function Footer() {
  return (
    <Box as="footer" py={6} bg="white" borderTopWidth={1} borderColor="gray.200" _dark={{ bg: "gray.800", borderColor: "gray.600" }}>
      <Container maxW="7xl">
        <VStack spacing={4} textAlign="center">
          <Text color="gray.600" _dark={{ color: "gray.300" }}>
            Empowering your career journey with AI-powered job preparation
            tools.
          </Text>
          <HStack 
            spacing={2} 
            color="gray.600" 
            _dark={{ color: "gray.300" }}
            flexWrap="wrap"
            justify="center"
          >
            <Link href="/terms-and-conditions">
              <Text _hover={{ textDecor: "underline" }} cursor="pointer">
                Terms and Conditions
              </Text>
            </Link>
            <Text>|</Text>
            <Link href="/refund-policy">
              <Text _hover={{ textDecor: "underline" }} cursor="pointer">
                Refund Policy
              </Text>
            </Link>
            <Text>|</Text>
            <Link href="/privacy-policy">
              <Text _hover={{ textDecor: "underline" }} cursor="pointer">
                Privacy Policy
              </Text>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  )
}
