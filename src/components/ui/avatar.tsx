import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (props, ref) => {
    return <ChakraAvatar ref={ref} {...props} />
  }
)

Avatar.displayName = 'Avatar'

export const AvatarFallback = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const AvatarImage = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />