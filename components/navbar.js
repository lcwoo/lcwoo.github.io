import Logo from './logo'
import NextLink from 'next/link'
import {
  Box,
  Link,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'

const menuItems = [
  { label: 'About', href: '/#about' },
  { label: 'Publications', href: '/#publications' },
  { label: 'Posters', href: '/posters/' },
  { label: 'News', href: '/#news' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' }
]
const Navbar = () => {
  const bg = useColorModeValue('rgba(250,250,252,0.96)', 'rgba(11,12,16,0.96)')
  const border = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.10)'
  )
  const color = useColorModeValue('ink.600', 'ink.300')
  const accent = useColorModeValue('brand.600', 'brand.300')
  return (
    <Box
      as="nav"
      aria-label="Main navigation"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg={bg}
      borderBottom="1px solid"
      borderColor={border}
      backdropFilter="blur(12px)"
    >
      <Flex
        maxW="1120px"
        mx="auto"
        w="calc(100% - 48px)"
        h="72px"
        align="center"
        justify="space-between"
        gap={4}
      >
        <Logo />
        <Flex align="center" gap={{ base: 2, lg: 5 }}>
          <Flex gap={6} display={{ base: 'none', lg: 'flex' }}>
            {menuItems.map(item => (
              <Link
                key={item.href}
                as={NextLink}
                href={item.href}
                fontSize="xs"
                fontWeight={500}
                color={color}
                _hover={{ color: accent, textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
          <ThemeToggleButton />
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              aria-label="Open navigation"
              icon={<HamburgerIcon />}
              variant="ghost"
              size="sm"
              display={{ base: 'inline-flex', lg: 'none' }}
            />
            <MenuList bg={bg} borderColor={border}>
              {menuItems.map(item => (
                <MenuItem
                  key={item.href}
                  as={NextLink}
                  href={item.href}
                  bg="transparent"
                  fontSize="sm"
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  )
}
export default Navbar
