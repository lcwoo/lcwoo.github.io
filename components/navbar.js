import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import { IoLogoGithub } from 'react-icons/io5'

const menuItems = [
  {
    label: 'Publications',
    href: '/publications',
    target: undefined,
    icon: null
  },
  {
    label: 'Posts',
    href: '/posts',
    target: undefined,
    icon: null
  },
  {
    label: 'Source',
    href: 'https://github.com/lcwoo/homepage',
    target: '_blank',
    icon: IoLogoGithub
  }
]

const LinkItem = ({ href, path, target, children, icon: Icon, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={active ? '#202023' : inactiveColor}
      target={target}
      display={Icon ? 'inline-flex' : 'block'}
      alignItems={Icon ? 'center' : undefined}
      style={Icon ? { gap: 4 } : undefined}
      pl={Icon ? 2 : undefined}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </Link>
  )
}


const Navbar = props => {
  const { path } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.100')

  return (
    <>
      <Box
        position="fixed"
        as="nav"
        w="100%"
        bg={useColorModeValue('#ffffff40', '#20202380')}
        css={{ backdropFilter: 'blur(10px)' }}
        zIndex={2}
        {...props}
      >
        <Container
          display="flex"
          p={2}
          maxW={{ base: '100%', md: 'container.xl' }}
          px={{ base: 3, md: 6 }}
          wrap="wrap"
          align="center"
          justify="space-between"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={'tighter'}>
              <Logo />
            </Heading>
          </Flex>

          {/* Desktop Menu - visible on md and above */}
          <Stack
            direction="row"
            display={{ base: 'none', md: 'flex' }}
            width="auto"
            alignItems="center"
            flexGrow={1}
            spacing={4}
          >
            {menuItems.map(item => (
              <LinkItem
                key={item.href}
                href={item.href}
                path={path}
                target={item.target}
                icon={item.icon}
              >
                {item.label}
              </LinkItem>
            ))}
          </Stack>

          {/* Right side: Theme toggle + Mobile menu button */}
          <Flex align="center" gap={2}>
            <ThemeToggleButton />

            {/* Mobile Hamburger Button - visible on base only */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<HamburgerIcon />}
              variant="outline"
              aria-label="Open menu"
              onClick={onOpen}
            />
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent maxW={{ base: '85%', sm: '75%' }}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4} mt={4}>
              {menuItems.map(item => (
                <Box key={item.href}>
                  <LinkItem
                    href={item.href}
                    path={path}
                    target={item.target}
                    icon={item.icon}
                    onClick={onClose}
                    w="100%"
                    borderRadius="md"
                    _hover={{ bg: hoverBg }}
                  >
                    {item.label}
                  </LinkItem>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar
