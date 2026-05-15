import { Box, Spinner, useColorModeValue } from '@chakra-ui/react'

export const SceneSpinner = () => (
  <Spinner
    size="lg"
    position="absolute"
    zIndex={2}
    left="50%"
    top="50%"
    ml="-20px"
    mt="-20px"
    color="brand.300"
  />
)

export const SceneContainer = ({ children }) => {
  const borderColor = useColorModeValue(
    'rgba(15,18,30,0.10)',
    'rgba(255,255,255,0.08)'
  )
  const hoverBorder = useColorModeValue(
    'rgba(15,18,30,0.22)',
    'rgba(255,255,255,0.18)'
  )
  const surface = useColorModeValue(
    'rgba(15,18,30,0.035)',
    'rgba(255,255,255,0.035)'
  )
  const bgBase = useColorModeValue('#F2F3F7', '#111319')
  const pattern = useColorModeValue(
    'repeating-linear-gradient(45deg, rgba(15,18,30,0.035) 0 2px, transparent 2px 6px)',
    'repeating-linear-gradient(45deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 6px)'
  )
  const hintBg = useColorModeValue(
    'rgba(250,250,252,0.65)',
    'rgba(11,12,16,0.65)'
  )
  const muted = useColorModeValue('ink.500', 'ink.400')

  return (
    <Box
      id="splat-card"
      bg={surface}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="18px"
      overflow="hidden"
      transition="border-color 220ms ease"
      _hover={{ borderColor: hoverBorder }}
    >
      <Box
        position="relative"
        bg={`${pattern}, ${bgBase}`}
        sx={{
          aspectRatio: { base: '4 / 3', md: '16 / 9' },
          minHeight: { base: '280px', md: '360px' }
        }}
        overflow="hidden"
      >
        <Box position="absolute" inset={0} w="100%" h="100%">
          {/* Mount node + overlays; GaussianSplats3D must own the mount div alone */}
          {children}
        </Box>
        <Box
          position="absolute"
          bottom="14px"
          left="50%"
          transform="translateX(-50%)"
          px="12px"
          py="6px"
          bg={hintBg}
          border="1px solid"
          borderColor={hoverBorder}
          borderRadius="full"
          backdropFilter="blur(8px)"
          fontFamily="mono"
          fontSize="0.7rem"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color={muted}
          zIndex={3}
          pointerEvents="none"
          opacity={0.85}
        >
          drag · zoom · explore
        </Box>
      </Box>
    </Box>
  )
}

const Loader = () => {
  return (
    <SceneContainer>
      <SceneSpinner />
    </SceneContainer>
  )
}

export default Loader
