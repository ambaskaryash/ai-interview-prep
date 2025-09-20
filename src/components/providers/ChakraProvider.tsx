'use client'

import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { ReactNode } from 'react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  fonts: {
    heading: `var(--font-outfit-sans), 'Inter', system-ui, sans-serif`,
    body: `var(--font-outfit-sans), 'Inter', system-ui, sans-serif`,
  },
  colors: {
    brand: {
      50: '#f0f4ff',
      100: '#e0e8ff',
      200: '#c3d4fe',
      300: '#a5b9fc',
      400: '#8b9df8',
      500: '#7c84f3',
      600: '#6b46c1',
      700: '#553c9a',
      800: '#44337a',
      900: '#322659',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        fontFamily: 'var(--chakra-fonts-body)',
        color: 'var(--chakra-colors-chakra-body-text)',
        background: props.colorMode === 'dark' 
          ? 'linear-gradient(135deg, #0f0318 0%, #1a0b2e 100%)'
          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        transitionProperty: 'background-color',
        transitionDuration: 'var(--chakra-transition-duration-normal)',
        lineHeight: 'var(--chakra-lineHeights-base)',
        minHeight: '100vh',
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
        _focus: {
          boxShadow: 'outline',
        },
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorScheme === 'brand' 
            ? 'linear-gradient(135deg, brand.500 0%, purple.500 100%)'
            : undefined,
          color: 'white',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
            _disabled: {
              transform: 'none',
            },
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        }),
        ghost: {
          _hover: {
            transform: 'translateY(-1px)',
            bg: 'whiteAlpha.200',
          },
          transition: 'all 0.2s',
        },
        outline: {
          borderWidth: '2px',
          _hover: {
            transform: 'translateY(-1px)',
            boxShadow: 'md',
          },
          transition: 'all 0.2s',
        },
      },
      sizes: {
        lg: {
          h: '12',
          px: '8',
          fontSize: 'lg',
        },
        xl: {
          h: '14',
          px: '10',
          fontSize: 'xl',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '2xl',
          bg: 'whiteAlpha.900',
          backdropFilter: 'blur(20px)',
          borderWidth: '1px',
          borderColor: 'whiteAlpha.300',
          boxShadow: 'xl',
          _dark: {
            bg: 'blackAlpha.300',
            borderColor: 'whiteAlpha.100',
          },
        },
      },
      variants: {
        elevated: {
          container: {
            boxShadow: '2xl',
            _hover: {
              transform: 'translateY(-4px)',
              boxShadow: '3xl',
            },
            transition: 'all 0.3s ease',
          },
        },
        glass: {
          container: {
            bg: 'whiteAlpha.100',
            backdropFilter: 'blur(20px)',
            borderColor: 'whiteAlpha.200',
            _dark: {
              bg: 'blackAlpha.200',
              borderColor: 'whiteAlpha.100',
            },
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
      },
    },
    Text: {
      baseStyle: {
        lineHeight: '1.7',
      },
    },
  },
  shadows: {
    outline: '0 0 0 3px rgba(124, 132, 243, 0.6)',
    glow: '0 0 20px -5px currentColor',
    '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
  },
  space: {
    '18': '4.5rem',
    '88': '22rem',
  },
})

interface ChakraProviderWrapperProps {
  children: ReactNode
}

export function ChakraProviderWrapper({ children }: ChakraProviderWrapperProps) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}