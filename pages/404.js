import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Button,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

const NotFound = () => {
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200')
  const surface = useColorModeValue(
    'rgba(255,255,255,0.68)',
    'rgba(255,255,255,0.045)'
  )
  const muted = useColorModeValue('ink.600', 'ink.300')

  return (
    <Container maxW="760px" px={0}>
      <Box
        p={{ base: 6, md: 8 }}
        border="1px solid"
        borderColor={borderColor}
        borderRadius={{ base: '24px', md: '30px' }}
        bg={surface}
      >
        <Badge mb={4}>404</Badge>
        <Heading
          as="h1"
          variant="page-title"
          fontSize={{ base: '3rem', md: '4.2rem' }}
        >
          Not found
        </Heading>
        <Text mt={4} color={muted}>
          The page you&apos;re looking for was not found.
        </Text>
        <Button as={NextLink} href="/" mt={7} leftIcon={<ChevronLeftIcon />}>
          Return to home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
