import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  MenuProps,
  MenuButtonProps,
  MenuItemProps,
  MenuListProps,
} from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'

export const DropdownMenu = ({ children, ...props }: MenuProps) => {
  return (
    <Menu {...props}>
      {children}
    </Menu>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <MenuButton ref={ref} {...props}>
        {children}
      </MenuButton>
    )
  }
)

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

export const DropdownMenuContent = forwardRef<HTMLDivElement, MenuListProps>(
  ({ children, ...props }, ref) => {
    return (
      <MenuList ref={ref} {...props}>
        {children}
      </MenuList>
    )
  }
)

DropdownMenuContent.displayName = 'DropdownMenuContent'

export const DropdownMenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <MenuItem ref={ref} {...props}>
        {children}
      </MenuItem>
    )
  }
)

DropdownMenuItem.displayName = 'DropdownMenuItem'

export const DropdownMenuSeparator = () => <MenuDivider />