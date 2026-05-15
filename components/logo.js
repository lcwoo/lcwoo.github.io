import Link from 'next/link'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'

const Logo = () => {
  const dotColor = useColorModeValue('brand.600', 'brand.300')
  const nameColor = useColorModeValue('ink.900', 'ink.50')
  const muted = useColorModeValue('ink.500', 'ink.400')

  return (
    <Link href="/#top">
      <Box
        display="inline-flex"
        alignItems="center"
        gap="8px"
        fontFamily="mono"
        fontSize="0.82rem"
        whiteSpace="nowrap"
        color={nameColor}
      >
        <Box
          w="7px"
          h="7px"
          borderRadius="full"
          bg={dotColor}
          boxShadow="0 0 8px currentColor"
        />
        <Text as="span" color={nameColor} fontWeight={700}>
          Lee Chung-woo
        </Text>
        <Text as="span" color={muted} display={{ base: 'none', md: 'inline' }}>
          /
        </Text>
        <Text as="span" color={muted} display={{ base: 'none', md: 'inline' }}>
          researcher
        </Text>
      </Box>
    </Link>
  )
}

export default Logo
