import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

export const SceneSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const SceneContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    className="voxel-dog"
    m="auto"
    mt={{ base: '-20px', md: '-60px', lg: '-120px' }}
    mb={{ base: '-40px', md: '-140px', lg: '-200px' }}
    w={{ base: '100%', sm: '320px', md: '480px', lg: '640px' }}
    maxW="100%"
    position="relative"
    sx={{
      aspectRatio: '1 / 1',
    }}
  >
    {children}
  </Box>
))

const Loader = () => {
  return (
    <SceneContainer>
      <SceneSpinner />
    </SceneContainer>
  )
}

export default Loader
