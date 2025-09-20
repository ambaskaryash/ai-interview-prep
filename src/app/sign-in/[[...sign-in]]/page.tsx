import { SignIn } from "@clerk/nextjs"
import { Box } from '@chakra-ui/react'

export default function SignInPage() {
  return (
    <Box 
      display="flex" 
      height="100vh" 
      width="100vw" 
      alignItems="center" 
      justifyContent="center"
    >
      <SignIn />
    </Box>
  )
}
