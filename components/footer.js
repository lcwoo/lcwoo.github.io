import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box align="center" fontSize="sm">
      <Box mb={3}>
        <img 
          alt="views" 
          src="https://hits.sh/lcwoo.github.io.svg?style=flat&label=views&color=06b6d4&labelColor=164e63"
          style={{ 
            height: '20px',
            borderRadius: '3px'
          }}
        />
      </Box>
      <Box opacity={0.4}>
        This website was inspired by
        {' '}
        <a href="https://www.craftz.dog/" target="_blank" rel="noopener noreferrer">
          Takuya Matsuyama&apos;s website
        </a>.
      </Box>
    </Box>
  )
}

export default Footer
