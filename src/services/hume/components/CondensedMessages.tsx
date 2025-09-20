import { UserAvatar } from "@/features/users/components/UserAvatar"
import { 
  VStack, 
  HStack, 
  Box, 
  Text, 
  Icon
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { BrainCircuitIcon } from "lucide-react"

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`

export function CondensedMessages({
  messages,
  user,
  className,
  maxFft = 0,
}: {
  messages: { isUser: boolean; content: string[] }[]
  user: { name: string; imageUrl: string }
  className?: string
  maxFft?: number
}) {
  return (
    <VStack spacing={4} w="full" align="stretch" className={className}>
      {messages.map((message, index) => {
        const shouldAnimate = index === messages.length - 1 && maxFft > 0

        return (
          <HStack
            key={index}
            spacing={5}
            alignSelf={message.isUser ? "flex-end" : "flex-start"}
            maxW="75%"
            p={4}
            border="1px"
            borderColor="gray.200"
            borderRadius="lg"
            bg={message.isUser ? "brand.50" : "white"}
            _dark={{
              borderColor: "gray.600",
              bg: message.isUser ? "brand.900" : "gray.800"
            }}
          >
            {message.isUser ? (
              <UserAvatar user={user} className="size-6 flex-shrink-0" />
            ) : (
              <Box position="relative">
                {shouldAnimate && (
                  <Box
                    position="absolute"
                    inset={0}
                    border="4px"
                    borderColor="gray.300"
                    borderRadius="full"
                    animation={`${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite`}
                  />
                )}
                <Icon
                  as={BrainCircuitIcon}
                  boxSize={6}
                  flexShrink={0}
                  color="brand.500"
                  transform={shouldAnimate ? `scale(${maxFft / 8 + 1})` : "scale(1)"}
                  transition="transform 0.1s ease"
                />
              </Box>
            )}
            <VStack spacing={1} align="start">
              {message.content.map((text, i) => (
                <Text
                  key={i}
                  color={message.isUser ? "brand.800" : "gray.700"}
                  _dark={{
                    color: message.isUser ? "brand.100" : "gray.200"
                  }}
                >
                  {text}
                </Text>
              ))}
            </VStack>
          </HStack>
        )
      })}
    </VStack>
  )
}
