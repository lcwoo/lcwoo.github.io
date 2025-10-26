import { Box } from '@chakra-ui/react'
import Image from 'next/image'

const Footer = () => {
  return (
    <Box align="center" fontSize="sm">
      <Box mb={3} opacity={1}>
        <Image
          src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Flcwoo.github.io&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=visitors&edge_flat=false"
          alt="visitor count"
          width={120}
          height={20}
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
