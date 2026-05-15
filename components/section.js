import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return shouldForwardProp(prop) || prop === 'transition'
  }
})

const Section = ({ children, delay = 0, ...props }) => (
  <StyledDiv
    initial={{ y: 18, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    my={{ base: '90px', md: '110px' }}
    {...props}
  >
    {children}
  </StyledDiv>
)

export default Section
