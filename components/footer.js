import NextLink from 'next/link'
import {
  Box,
  Container,
  Flex,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
const Footer = () => {
  const muted = useColorModeValue('ink.500', 'ink.400')
  const border = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
  return (
    <Box as="footer" mt={16} py={7} borderTop="1px solid" borderColor={border}>
      <Container maxW="1168px" px={6}>
        <Flex
          justify="space-between"
          gap={4}
          flexWrap="wrap"
          fontSize="xs"
          color={muted}
        >
          <Text>Chungwoo Lee © {new Date().getFullYear()}</Text>
          <Flex gap={6}>
            <Text>Seoul, South Korea</Text>
            <Link as={NextLink} href="/#top" color="inherit">
              Back to top ↑
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
export default Footer
