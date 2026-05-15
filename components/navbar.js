import Logo from './logo'
import NextLink from 'next/link'
import { Box, Link, Stack, useColorModeValue } from '@chakra-ui/react'
import ThemeToggleButton from './theme-toggle-button'

const menuItems = [
  { label: 'about', href: '/#about' },
  { label: 'news', href: '/#news' },
  { label: 'publications', href: '/#publications' },
  { label: 'projects', href: '/#selected-projects' },
  { label: 'experience', href: '/#experience' },
  { label: 'contact', href: '/#contact' }
]

const LinkItem = ({ href, children }) => {
  const color = useColorModeValue('ink.500', 'ink.300')
  const hoverColor = useColorModeValue('ink.900', 'ink.50')
  const hoverBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')

  return (
    <Link
      as={NextLink}
      href={href}
      color={color}
      px="10px"
      py="6px"
      borderRadius="full"
      borderBottom="none"
      fontFamily="mono"
      fontSize={{ base: '0.7rem', md: '0.75rem' }}
      _hover={{
        color: hoverColor,
        bg: hoverBg,
        borderBottom: 'none',
        textDecoration: 'none'
      }}
    >
      {children}
    </Link>
  )
}

const Navbar = () => {
  const bg = useColorModeValue('rgba(250,250,252,0.75)', 'rgba(11,12,16,0.75)')
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const shadow = useColorModeValue(
    '0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 24px -16px rgba(15,18,30,0.25)',
    '0 1px 0 rgba(255,255,255,0.03) inset, 0 10px 30px -14px rgba(0,0,0,0.55)'
  )

  return (
    <Box
      as="nav"
      position="fixed"
      top="18px"
      left="50%"
      transform="translateX(-50%)"
      zIndex={50}
      display="flex"
      alignItems="center"
      gap={{ base: '10px', md: '18px' }}
      px={{ base: '10px', md: '14px' }}
      py={{ base: '8px', md: '9px' }}
      pl={{ base: '12px', md: '16px' }}
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="999px"
      maxW="calc(100vw - 24px)"
      overflowX="auto"
      boxShadow={shadow}
      css={{
        backdropFilter: 'blur(18px) saturate(140%)',
        WebkitBackdropFilter: 'blur(18px) saturate(140%)'
      }}
    >
      <Logo />
      <Stack
        as="ul"
        direction="row"
        spacing={0}
        m={0}
        p={0}
        listStyleType="none"
        flexShrink={0}
      >
        {menuItems.map(item => (
          <Box as="li" key={item.href}>
            <LinkItem href={item.href}>{item.label}</LinkItem>
          </Box>
        ))}
      </Stack>
      <ThemeToggleButton />
    </Box>
  )
}

export default Navbar
