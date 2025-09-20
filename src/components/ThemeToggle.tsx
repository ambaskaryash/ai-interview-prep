"use client"

import * as React from "react"
import { useColorMode } from "@chakra-ui/react"
import { Monitor, Moon, Sun } from "lucide-react"

import { useEffect, useState } from "react"
import { Icon, Box, IconButton } from "@chakra-ui/react"


export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <IconButton
      variant="ghost"
      size="sm"
      p={2}
      _hover={{ bg: 'gray.100', _dark: { bg: 'gray.700' } }}
      transition="all 0.2s"
      icon={<Icon as={colorMode === "dark" ? Moon : Sun} />}
      aria-label="Toggle theme"
      onClick={toggleColorMode}
    />
  )
}
