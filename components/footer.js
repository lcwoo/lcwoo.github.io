import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

const Footer = () => {
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const surface = useColorModeValue(
    'rgba(15,18,30,0.035)',
    'rgba(255,255,255,0.035)'
  )
  const muted = useColorModeValue('ink.400', 'ink.500')
  const dotColor = useColorModeValue('#3B5BFE', '#5EEAD4')

  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor={borderColor}
      py="26px"
      mt="80px"
      bg={surface}
    >
      <Container maxW="1040px" px="28px">
        <Flex
          justify="space-between"
          align="center"
          fontFamily="mono"
          fontSize="0.78rem"
          color={muted}
          direction={{ base: 'column', sm: 'row' }}
          gap={3}
        >
          <HStack spacing="10px">
            <Box
              w="7px"
              h="7px"
              borderRadius="full"
              bg={dotColor}
              boxShadow="0 0 8px currentColor"
            />
            <Text>Lee Chung-woo · {new Date().getFullYear()}</Text>
          </HStack>
          <Text
            fontSize="0.68rem"
            letterSpacing="0.08em"
            textTransform="uppercase"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="4px"
            px="7px"
            py="2px"
          >
            crafted with care
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
