"use client"

import {
  BookOpenIcon,
  BrainCircuitIcon,
  FileSlidersIcon,
  LogOut,
  SpeechIcon,
  User,
} from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton, useClerk } from "@clerk/nextjs"
import Link from "next/link"
import { UserAvatar } from "@/features/users/components/UserAvatar"
import { useParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Box, Flex, Icon, Text, Container } from "@chakra-ui/react"

const navLinks = [
  { name: "Interviews", href: "interviews", Icon: SpeechIcon },
  { name: "Questions", href: "questions", Icon: BookOpenIcon },
  { name: "Resume", href: "resume", Icon: FileSlidersIcon },
]

export function Navbar({ user }: { user: { name: string; imageUrl: string } }) {
  const { openUserProfile } = useClerk()
  const { jobInfoId } = useParams()
  const pathName = usePathname()

  return (
    <Box 
      as="nav" 
      h="16" 
      borderBottom="1px" 
      borderColor="gray.200"
      bg="white"
      _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(10px)"
    >
      <Container maxW="6xl" h="full" px={{ base: 4, md: 6 }}>
        <Flex h="full" align="center" justify="space-between">
          <Link href="/app">
            <Flex 
              align="center" 
              gap={3}
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              <Icon 
                as={BrainCircuitIcon} 
                w={{ base: 7, md: 8 }} 
                h={{ base: 7, md: 8 }} 
                color="brand.500" 
              />
              <Text 
                fontSize={{ base: 'lg', md: 'xl' }} 
                fontWeight="bold"
                color="gray.800"
                _dark={{ color: 'white' }}
              >
                EvoInterview
              </Text>
            </Flex>
          </Link>

          <Flex align="center" gap={{ base: 2, md: 4 }}>
            {typeof jobInfoId === "string" && (
              <Flex 
                align="center" 
                gap={2} 
                display={{ base: 'none', md: 'flex' }}
              >
                {navLinks.map(({ name, href, Icon: IconComponent }) => {
                  const hrefPath = `/app/job-infos/${jobInfoId}/${href}`
                  const isActive = pathName === hrefPath

                  return (
                    <Link key={name} href={hrefPath}>
                      <Button
                        variant={isActive ? "solid" : "ghost"}
                        colorScheme={isActive ? "brand" : "gray"}
                        size="sm"
                        leftIcon={<Icon as={IconComponent} />}
                        _hover={{
                          transform: 'translateY(-1px)',
                          boxShadow: 'md'
                        }}
                        transition="all 0.2s"
                      >
                        {name}
                      </Button>
                    </Link>
                  )
                })}
              </Flex>
            )}

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Box 
                  _hover={{ transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  <UserAvatar user={user} />
                </Box>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => openUserProfile()}>
                  <Icon as={User} mr={2} />
                  Profile
                </DropdownMenuItem>
                <SignOutButton>
                  <DropdownMenuItem>
                    <Icon as={LogOut} mr={2} />
                    Logout
                  </DropdownMenuItem>
                </SignOutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
