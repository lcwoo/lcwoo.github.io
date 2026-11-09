import { Box } from '@chakra-ui/react'

const Section = ({ children, delay: _delay = 0, ...props }) => (
  <Box my={{ base: '90px', md: '110px' }} {...props}>
    {children}
  </Box>
)
export default Section
