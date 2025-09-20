import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { Box, Flex, Text } from '@chakra-ui/react'

export function BackLink({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn("-ml-3", className)}
    >
      <Link href={href}>
        <Flex gap={2} alignItems="center" fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
          <ArrowLeftIcon />
          {children}
        </Flex>
      </Link>
    </Button>
  )
}
