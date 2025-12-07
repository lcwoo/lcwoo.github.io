import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" fontSize="sm">
      <Box opacity={0.4}>
        This website was inspired by{' '}
        <a href="https://www.craftz.dog/" target="_blank" rel="noopener noreferrer">
          Takuya Matsuyama&apos;s website
        </a>.
      </Box>
    </Box>
  )
}

export default Footer
