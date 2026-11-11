import { Box, Flex, Spinner, Text, useColorModeValue } from '@chakra-ui/react'

export const SceneSpinner = ({ label }) => (
  <Flex
    position="absolute"
    zIndex={2}
    left="50%"
    top="50%"
    transform="translate(-50%, -50%)"
    direction="column"
    align="center"
    gap={3}
  >
    <Spinner size="lg" color="brand.300" />
    {label && (
      <Text fontFamily="mono" fontSize="xs" opacity={0.7}>
        {label}
      </Text>
    )}
  </Flex>
)

export const SceneContainer = ({ children, controls }) => {
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
  const background = useColorModeValue('#edf0f3', '#0e1116')
  const muted = useColorModeValue('ink.600', 'ink.300')
  return (
    <Box id="splat-card" w="100%" minW={0} overflow="hidden">
      <Box
        position="relative"
        w="100%"
        minW={0}
        bg={background}
        h={{ base: '240px', md: '320px' }}
        overflow="hidden"
      >
        <Box position="absolute" inset={0} w="100%" h="100%" minW={0}>
          {children}
        </Box>
      </Box>
      <Flex
        borderTop="1px solid"
        borderColor={borderColor}
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
        gap={3}
        flexWrap="wrap"
      >
        <Text color={muted} fontSize="xs" lineHeight={1.7}>
          Drag to rotate · Pinch or scroll to zoom
        </Text>
        {controls && (
          <Box w={{ base: '100%', md: '320px' }} maxW="100%">
            {controls}
          </Box>
        )}
      </Flex>
    </Box>
  )
}
const Loader = () => (
  <SceneContainer>
    <SceneSpinner />
  </SceneContainer>
)
export default Loader
