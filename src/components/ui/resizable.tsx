import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

interface ResizablePanelGroupProps extends Omit<FlexProps, 'direction'> {
  children: ReactNode
  direction?: 'horizontal' | 'vertical'
}

export const ResizablePanelGroup = forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ children, direction = 'horizontal', ...props }, ref) => {
    return (
      <Flex
        ref={ref}
        direction={direction === 'horizontal' ? 'row' : 'column'}
        h="100%"
        {...props}
      >
        {children}
      </Flex>
    )
  }
)

ResizablePanelGroup.displayName = 'ResizablePanelGroup'

interface ResizablePanelProps extends FlexProps {
  children: ReactNode
  defaultSize?: number
  minSize?: number
  id?: string
}

export const ResizablePanel = forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ children, defaultSize, minSize, id, ...props }, ref) => {
    return (
      <Box 
        ref={ref} 
        flex={defaultSize || 1} 
        minW={minSize ? `${minSize}%` : undefined}
        minH={minSize ? `${minSize}%` : undefined}
        id={id}
        {...props}
      >
        {children}
      </Box>
    )
  }
)

ResizablePanel.displayName = 'ResizablePanel'

interface ResizableHandleProps {
  withHandle?: boolean
}

export const ResizableHandle = ({ withHandle, ...props }: ResizableHandleProps) => (
  <Box
    w={withHandle ? "4px" : "1px"}
    bg="gray.300"
    cursor="col-resize"
    _hover={{ bg: 'gray.400' }}
    _dark={{
      bg: 'gray.600',
      _hover: { bg: 'gray.500' }
    }}
    {...props}
  />
)
