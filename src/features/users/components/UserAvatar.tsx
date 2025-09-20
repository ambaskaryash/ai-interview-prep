import { ComponentProps } from "react"
import { Avatar } from "@chakra-ui/react"

export function UserAvatar({
  user,
  ...props
}: {
  user: { name: string; imageUrl: string }
} & ComponentProps<typeof Avatar>) {
  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map(n => n[0])
    .join("").toUpperCase()
    
  return (
    <Avatar 
      src={user.imageUrl} 
      name={user.name}
      {...props}
    >
      {initials}
    </Avatar>
  )
}
