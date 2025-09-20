"use client"

import { useState } from "react"
import { VStack, Button, Text, Box, Code } from "@chakra-ui/react"
import { canCreateInterview } from "@/features/interviews/permissions"
import { createInterview } from "@/features/interviews/actions"
import { env } from "@/data/env/client"

export function InterviewDebug({ jobInfoId }: { jobInfoId: string }) {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runDebugTests = async () => {
    setLoading(true)
    try {
      const results = {
        timestamp: new Date().toISOString(),
        env: {
          hasHumeConfigId: !!env.NEXT_PUBLIC_HUME_CONFIG_ID,
          humeConfigIdLength: env.NEXT_PUBLIC_HUME_CONFIG_ID?.length || 0,
          clerkPublishableKey: !!env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        },
        permissions: {
          canCreateInterview: await canCreateInterview(),
        },
        interviewCreation: null as any
      }

      try {
        const interviewResult = await createInterview({ jobInfoId })
        results.interviewCreation = interviewResult
      } catch (error) {
        results.interviewCreation = { 
          error: true, 
          message: error instanceof Error ? error.message : String(error) 
        }
      }

      setDebugInfo(results)
    } catch (error) {
      setDebugInfo({ 
        error: "Debug failed", 
        message: error instanceof Error ? error.message : String(error) 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      <Button 
        onClick={runDebugTests} 
        isLoading={loading}
        colorScheme="red"
        size="sm"
      >
        Run Interview Debug Tests
      </Button>
      
      {debugInfo && (
        <Box 
          p={4} 
          bg="gray.100" 
          _dark={{ bg: "gray.800" }} 
          borderRadius="md"
          maxH="400px"
          overflowY="auto"
        >
          <Text fontSize="sm" fontWeight="bold" mb={2}>Debug Results:</Text>
          <Code 
            display="block" 
            whiteSpace="pre-wrap" 
            p={2}
            fontSize="xs"
          >
            {JSON.stringify(debugInfo, null, 2)}
          </Code>
        </Box>
      )}
    </VStack>
  )
}