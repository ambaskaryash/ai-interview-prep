"use client"

import * as React from "react"
import { useColorMode } from "@chakra-ui/react"
import { Monitor, Moon, Sun } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { Icon, Box } from "@chakra-ui/react"

const themes = [
  {
    name: "Light",
    Icon: Sun,
    value: "light",
  },
  {
    name: "Dark",
    Icon: Moon,
    value: "dark",
  },
] as const

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        variant="ghost"
        size="sm"
        p={2}
        _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}
        transition="all 0.2s"
      >
        <Icon as={colorMode === "dark" ? Moon : Sun} />
        <Box srOnly>Toggle theme</Box>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themes.map(({ name, Icon: IconComponent, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => {
              if (value === "light" && colorMode === "dark") toggleColorMode()
              if (value === "dark" && colorMode === "light") toggleColorMode()
            }}
            bg={colorMode === value ? "purple.100" : "transparent"}
            _dark={{ bg: colorMode === value ? "purple.900" : "transparent" }}
          >
            <Icon as={IconComponent} mr={2} />
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
